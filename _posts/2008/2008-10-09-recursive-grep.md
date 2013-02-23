---
layout: post
title:  Recursive grep (grepr) for Solaris
---

So if you’re a Linux user that’s ever used Solaris, you know that a lot of the commands don’t translate exactly the same. One such issue is the lack of a recursive flag (-R) on the grep command. Not a problem though, bash is a powerful thing. Here’s my solution to the problem:

	#!/bin/bash

	# Simulates the Linux grep with the recursive flag -R Originally built to
	# keep my sanity on older Sun Solaris installs.
	#
	# @author Josh Sherman
	# @link http://joshtronic.com

	if [ -z "$1" ]; then
		echo "Usage: grepr.sh pattern path"
		exit
	fi

	if [ -z "$2" ]; then
		SEARCH_PATH="."
	else
		SEARCH_PATH="$2"
	fi

	for i in `find $SEARCH_PATH`; do
		RESULTS=$(grep "$1" $i)

		if [ "$RESULTS" ]; then
			echo
			echo "$i:"
			echo "$RESULTS"
		fi
	done
