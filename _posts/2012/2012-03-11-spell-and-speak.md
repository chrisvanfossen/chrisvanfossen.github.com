---
layout: post
title:  Spell &amp; Speak
---

One thing that I really enjoy about OSX (possibly the only thing) is the text to speech capabilities. The command line application `say` sounds good and doesn’t seem nearly as buggy as some of the open source counterparts. Now what I’ve been doing recently to help get my daughter acclimated to using a computer (and not just touch interfaces) is allowing her to type on the computer and have it talk back to her. This typically includes jacking up the terminal’s font size to max and then running `say` in interactive mode and letting her go to town.

This worked out well for a while, but then I got to thinking, “wouldn’t it be way more beneficial for it to spell the words out and then say the word?” The wife agreed and I set out to write a little script to allow this to happen.

On the first pass, I set it up to say the letters as you type. Unfortunately this created a delay when typing in words and just wasn’t nearly as functional. 1.0 of the app reads in your text and upon hitting enter says back each letter, when it hits a space, it will say the word, then when it reaches the end of the phrase, it will read back the entire thing.

The other big feature is the ability to run it on Linux using `espeak` (which I believe is installed by default by most distros). I’m still hunting for a better speech synthesizer for Linux as most of them that I messed around with had little quirks I wasn’t willing to deal with. `festival` has an interactive mode that is more like a scripting language than simply piping text. `flite` was the best sounding IMO but took 2-3 seconds to exit, which was intolerable. `espeak` was throwing a bunch of errors about JACK but was working in a speedy fashion, hence piping it’s output to /dev/null

Not sure I’ll get to them, but some future improvements would be to log what the child is typing and the amount of time using the app (for us home school parents that have to track that sort of thing) and a question / answer mode where we can feed it a list of words and it says them and then asks you to type them in. Since my daughter’s been using this app she’s completely stopped typing in gibberish and is focusing more on the words, and that’s a good thing. And speaking of good things, here’s the code:

	#!/bin/bash

	echo "Press [CTRL+C] to exit..."; echo

	os=${OSTYPE//[0-9.]/}

	if [[ "$os" == "linux-gnu" ]];
	then
		speak="espeak -v english-us"
	elif [[ "$os" == "darwin" ]];
	then
		speak="say"
	else
		echo "Operating system is not supported"
		exit
	fi

	while :
	do
		phrase=''

		# Break apart words
		IFS=' ' read -ra chars
		for i in "${chars[@]}"; do
			# Break apart letters
			j=0
			while [ $j -lt ${#i} ];
			do
				$speak "${i:$j:1}" &> /dev/null
				j=$((j+1));
			done

			$speak "$i" &> /dev/null

			if [[ "$phrase" = "" ]];
			then
				phrase="$i"
			else
				phrase="$phrase $i"
			fi
		done

		# Don't say it twice!
		if [[ $phrase != $chars ]];
		then
			$speak "$phrase" &> /dev/null
		fi
	done
