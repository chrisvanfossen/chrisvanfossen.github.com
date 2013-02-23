---
layout: post
title:  File Usage Reporting Script
---

In retrospect on writing this Python script, I probably could have pulled it off in a short Bash script. Maybe another day. Anyway, this latest utility script of mine takes a variable number of arguments, the first being the “needle” directory. The needle directory are the files you want to check the usage on. Any additional directories listed will be considered “haystacks” and the files will be searched for any occurrence of the needle files. A report is generated so you can easily identify which files are no longer being used. I typically search my Smarty template files for occurrences of my images. Any images that aren’t referenced are typically removed from the repository promptly. Helps a lot while developing / updating existing pages will new content.

	#!/usr/bin/env python

	# Uses one directory as the needle and another (or more) as the haystack
	# to be able to determine file usage.  The common use is to determine if
	# you have any unreferenced images, css or JavaScript files.  For example,
	# use the images directory as the needle and your templates directory as
	# the haystack to see how many times the images are referenced.  If any
	# have a count of zero, it's probably time to remove them.
	#
	# @author Josh Sherman
	# @link   http://joshtronic.com

	import os
	import re
	import sys

	def loadFiles(path):

		# Initializes our list
		files = []

		# Loops through the files in the path
		for file in os.listdir(path):
			# Checks that the file isnt '.', '..', or '.svn'
			if re.compile('^(\.{1,2}|\.svn)$').match(file) == None:
				file = path + '/' + file

				# Checks if the file is a directory
				if os.path.isdir(file) == True:
					nested_files = loadFiles(file)

					# Loops through the results and appends to our list
					for nested_file in nested_files:
						files.append(nested_file)
				else:
					# Appends the file to our list
					files.append(file)

		return files

	def checkUsage(needles, haystacks):

		# Zeros out the usage list
		usage = {}

		for needle in needles:
			usage[needle] = 0

		# Loops through each haystack
		for haystack in haystacks:

			# Reads in the contents of the haystack
			file	 = open(haystack, 'r')
			contents = file.read()

			# Loops through the haystacks
			for needle in needles:

				# Counts the number of times an needle occurs
				needle_count = contents.count(needle)
				if needle_count > 0:
					usage[needle] += needle_count

		return usage

	if __name__ == '__main__':

		# Checks if the correct arguments were passed
		try:
			argc = len(sys.argv)

			for i in range(1, argc):
				# Strips trailing slashes
				if sys.argv[i][-1] == '/':
					sys.argv[i] = sys.argv[i][0:-1]

			needle_path	= sys.argv[1]
			haystack_paths = []

			# Loops through all the passed haystack directories
			for i in range(2, argc):
				haystack_paths.append(sys.argv[i])

		except:
			exit('Usage: ./file-usage.py /path/to/needles /path/to/haystacks...')

		# Checks that the arguments are valid directories
		if os.path.exists(needle_path) == False or os.path.isdir(needle_path) == False:
			exit('Error: The specified needles path (' + needle_path + ') is not a valid directory.')
		else:

			# Loads our needle files
			needles = loadFiles(needle_path)

			# Loads our haystack files
			haystack_files = []

			for haystack_path in haystack_paths:
				if os.path.exists(haystack_path) == False or os.path.isdir(haystack_path) == False:
					exit('Error: The specified haystack path (' + haystack_path + ') is not a valid directory.')

				haystack_files.extend(loadFiles(haystack_path))

			# Extracts the root needle path
			root_needle_path = needle_path.split('/')[-1]

			# Loops through the images and replaces the full path with the root path
			temp = []
			for needle in needles:
				temp.append(root_needle_path + needle.split(root_needle_path, 1)[1]);

			needles = temp

			# Pulls the usage for each needle
			usage = checkUsage(needles, haystack_files)

			# Sorts the results
			items = [(v, k) for k, v in usage.items()]
			items.sort()
			items.reverse()
			usage = [(k, v) for v, k in items]

			# Generates our usage report
			print 'File Usage Report:'
			print '=================='

			for image in usage:
				print image[1], '\t', image[0]
