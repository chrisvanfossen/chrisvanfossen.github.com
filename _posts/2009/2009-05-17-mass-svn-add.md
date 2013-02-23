---
layout: post
title:  Mass `svn add` script
---

So I have a tendency to add a bunch of new files to a project before actually doing a commit in Subversion. It’s usually not an issue, I go through an add each new file and then finally do my commit. Welp, I’m sick of it, so I wrote a little Bash script to help automate the process slightly. The script takes the directory and loops through detecting any files marked as “?”. From there, it will prompt if you would like to add it or not. Easy as that. Unfortunately, I wrote it after I did a large commit earlier this evening. Next time, I suppose.

	#!/bin/bash

	# Assists in adding files currently not in a Subversion repository by
	# automatically prompting you as to whether or not you want to add each
	# file not currently in the repository
	#
	# @author Josh Sherman
	# @link   http://joshtronic.com

	if [ -z "$1" ]; then
		echo "Usage: svn-add.sh /path/to/svn/repository"
		exit
	else
		svn_status=`svn status $1`
	fi

	add_file=false

	for i in $svn_status; do

		if [ $add_file == true ]; then
			echo -n "Add $i? [Y/n]: "
			read confirm

			if [ -z $confirm ] || [ $confirm == "Y" ] || [ $confirm == "y" ]; then
				svn add $i &> /dev/null
				echo "Added $i"
			fi
		fi

		if [ $i == "?" ]; then
			add_file=true
		else
			add_file=false
		fi
	done
