---
layout: post
title:  Recursive PHP Lint-inator
---

Just cleaning up a repository at work and came across a script I haven’t used in forever, a script to lint all PHP files in a directory, recursively.

Expect something more stimulating soon as I found out the hard way that tumblr doesn’t seem to auto-save your posts once you’ve saved them once as a draft. Or I’m an idiot, either way, enjoy the script.

	#!/bin/bash

	for file in `find .`
	do
		EXTENSION="${file##*.}"

		if [ "$EXTENSION" == "php" ] || [ "$EXTENSION" == "phtml" ]
		then
			RESULTS=`php -l $file`

			if [ "$RESULTS" != "No syntax errors detected in $file" ]
			then
				echo $RESULTS
			fi
		fi
	done

And yes, the title is a Dr. Doofenshmirtz reference.
