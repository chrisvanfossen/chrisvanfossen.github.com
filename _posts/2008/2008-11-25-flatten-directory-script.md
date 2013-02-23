---
layout: post
title:  Bash script to flatten a directory
---

I just came across an old CD of Fonts that I had purchased before I knew better. Well I didn’t want to throw the disc out without copying all the fonts to my system. All the fonts were broken up into directories that corresponded to the first letter of the name. It seems like there is some Windows software interface to handle installing the fonts that would make those directories transparent. Since I didn’t want to have those fonts split up by first letter, I wrote a little bash script to flatten the directories. All it does is loop through all the directories in the passed source directory, and copies every non-directory file to the passed target directory (or . if the argument is omitted).

	#!/bin/bash

	# Copies files inside nested directories to a single directory. Script does
	# not do any checking for existing files, consider yourself warned.
	#
	# @author Josh Sherman
	# @link   http://joshtronic.com

	if [ -z "$1" ]; then
		echo "Usage: flatten-dir.sh /path/to/nested/directories [ /path/to/target/directory ]"
		exit
	else
		NESTED_PATH="$1"
	fi

	if [ -z "$2" ]; then
		TARGET_PATH="."
	else
		TARGET_PATH="$2"
	fi

	for i in `find $NESTED_PATH`; do
		if [ -f "$i" ]; then
			cp $i $TARGET_PATH
		fi
	done

**Note:** It was pointed out to me that this script doesn’t handle identically named files inside the directories you are flattening. This wasn’t something I had to worry about with the fonts CD, but you may need to worry about if you intend to use this. A couple of solutions would be to prefix the files with the directory name they came from, or keep a list of the files you’ve already moved, and if you hit a duplicate append a number to the end, or even prompt for user input and let them rename it or something. Perhaps in the future I’ll expand upon this script, but not today my friends.
