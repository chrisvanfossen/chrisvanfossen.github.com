---
layout: post
title:  All Music Guide (AMG) Tagging Script
---

So recently I decided that I hated how my music collection was tagged. I try to break apart the genre’s but ideally most of my music falls under multiple genres. Well All Music Guide (AMG, allmusic.com) does a pretty good job of classifying everything. They use broad genres, and then further define music based on the styles it falls into. Most of us consider those styles to be genres of their own, but ideally you can’t really have more than one genre, and if you use iTunes (like I do) you know that comma separating the genres is a mess (each unique genre string is treated as such). My solution is to use the broad genre as the actual genre, and then plug the styles into the comment tag. This worked out great, except that it was a lot of leg work to look up those artists and update the tags manually. Unfortunately I did that with my entire library before writing this script. The script I wrote is in Python and looks up the artist / album on the AMG website, then loads in the genre and styles, and updates the files accordingly (currently only supports MP3 files). Just to warn you, this script is completely proof of concept and may be considered a malicious spider by AMG as it does mine their site for data. “Why not use one of those other services out there to update my library,” you ask? Well it’s because I don’t really considered “this is shit” to be a valid tag for any of my music. AMG is for the most part the best repository of such data (albeit it’s mostly mainstream music) and it’s not biased the way other community driven databases are. Enjoy allmusictagger.py and if you end up expanding upon it, drop me a line and let me know.

	#!/usr/bin/env python

	# Updates the genre and comment tags of MP3 files with data from
	# allmusic.com. Specifically, the genre is populated with the fairly board
	# genre listing and the comment tag is populated with the more specific
	# styles for a particular album.
	#
	# Furthermore, I don't have permission from allmusic.com to do this, so if
	# they come after you for using it, please respect their wishes.
	#
	# Be warned that this script is fairly buggy and is more of a proof of
	# concept than anything else.  Also, it was developed on Ubuntu Linux, no
	# efforts were made to get it working on other platforms.
	#
	# @author Josh Sherman
	# @link   http://joshtronic.com

	from mutagen.id3 import ID3, TCON, COMM
	from numpy import *

	import os
	import pickle
	import re
	import sys
	import urllib

	# Recursively processes the files
	def process(path):
		global _cache

		for file in os.listdir(path):
			file = path + '/' + file

			if os.path.isdir(file) == True:
				process(file)
			else:
				# Checks the file extension
				# TODO Add support for m4a and wma
				if file[-3:] == 'mp3':
					audio = ID3(file)

					# Pulls the artist and album from existing ID3 tags
					artist = audio['TPE1'][0].lower()
					album  = audio['TALB'][0].lower()

					# Note: This is a hack for NIN albums prefixed with 'Halo # - '
					pattern = re.compile('^halo [0-9]{2} - ')
					if pattern.match(album):
						album = pattern.sub('', album)

					genre = styles = ''

					# Tries to load the data from cache, else does a full look up
					try:
						if _cache[artist][album] != None:
							genre  = _cache[artist][album]['genre']
							styles = _cache[artist][album]['styles']

					except:
						# Performs an album search
						params  = urllib.urlencode({'P': 'amg', 'sql': album, 'opt1': 2, 'samples': 1})
						webpage = urllib.urlopen("http://www.allmusic.com/cg/amg.dll", params)
						html	= webpage.read()

						# Breaks apart the results and tries to find our artist
						if html.find('') != -1:

							# Isolates the table of results
							html = html.lower()
							html = html.split('')
							html = html[1].split('')
							html = html[0].split('', html[i])

								# Checks the artist, and then the album
								if result[3].replace('&', '&') == artist:
									result_album = result[5].split('"')
									if result_album[2][1:-4] == album:

										# Opens the album's URL
										webpage = urllib.urlopen('http://www.allmusic.com' + result_album[1].replace('&', '&'))
										html = webpage.read()

										if html.find('') != -1:

											# Extracts the Genre & Styles block of HTML
											html = html.split('')
											html = html[1].split('')

											# Extracts the genre name
											genre = html[0].split('');
											genre = genre[0].split('>');
											genre = genre[-1]

											# Extracts all of the styles
											temp = list()
											styles = html[1].split('');
											for style in styles:
												style = style.split('>')
												style = style[-1]

												if style.strip() != '':
													temp.append(style)

											# Converts the list to a string (comma delimited)
											styles = temp
											temp   = ''
											for style in styles:
												if temp != '':
													temp += ', '

												temp += style.replace('/ ', '/')

											styles = temp
											temp   = ''

											# Adds the data to the cache
											_cache[artist] = {}
											_cache[artist][album] = {}
											_cache[artist][album]['genre']  = genre
											_cache[artist][album]['styles'] = styles

											break

							# Caches the artist / album as None if no results were obtained
							if genre == '' and styles == '':
								_cache[artist] = {}
								_cache[artist][album] = None

						else:
							exit('Error: The search yielded unexpected results.')

					try:
						# Updates the genre and comments with the extracted values
						if genre != '' and styles != '':
							audio.add(TCON(encoding=3, text=unicode(genre)))
							audio.add(COMM(encoding=3, text=unicode(styles), lang='eng', desc=''))
							audio.save()
						else:
							print 'Error: The file (' + file + ') was not able to be updated, no entry was found on allmusic.com'
					except:
						print 'Error: The file (' + file + ') was not able to be updated.'

	if __name__ == '__main__':
		global _cache

		# Check if a path is passed in and is valid
		try:
			path = sys.argv[1]
		except:
			exit('Usage: ./allmusic-tagger.py /path/to/music')

		if os.path.exists(path) == False or os.path.isdir(path) == False:
			exit('Error: The specified path (' + path + ') is not a valid directory.')
		else:
			cache_filename = '/tmp/allmusic-tagger_cache.pkl'

			# Loads the cache
			if os.path.exists(cache_filename) and os.path.isfile(cache_filename):
				cache_file = open(cache_filename, 'rb')
				_cache	 = pickle.load(cache_file)
				cache_file.close()
			else:
				_cache = {}

			# Strips trailing slash
			if path[-1] == '/':
				path = path[0:-1]

			# Processes our files
			process(path)

			# Stores the cache
			cache_file = open(cache_filename, 'wb')
			pickle.dump(_cache, cache_file)
			cache_file.close()
