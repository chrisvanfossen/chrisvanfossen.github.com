---
layout: post
title:  'PHP: Built for the web'
---

If you know me, you know I’m a pretty devout PHP coder when it comes to my own adventures in web development. I’ve been using it since version 3 (started with it in Y2K) and in using it that long, I’d be the last person to say that it’s a perfect language. Is any language perfect? Nope, and if you think your language of choice is, then you probably don’t know enough about the language to know about those subtle nuances that can ruin your day. Perhaps in the future, there will be a perfect language but if I had to guess, it will be written by the machines and will be used to help to bring an end of days to the human race.

So why use it if it’s so flawed? Quite simply, I love the fact that PHP was originally conceived to build websites. PHP originally stood for Personal Home Page Tools and it was built by Rasmus Lerdorf so that he could maintain his personal website. Why is this so important to me? Because it was designed to build websites, a lot of common functions are already built (albeit sometimes with bizarre naming conventions). Sure, objects in PHP suck but so does writing 3 lines of code to generate an MD5 hash in Python:

## PHP

	md5('hash it up!');

## Python

	md5 = hashlib.md5()
	md5.update('hash it up!')
	md5.digest()

To do the equivalent in Ruby you need a Gem. Speaking of Ruby Gems, I’m starting to think there is such a thriving community building them is because there has to be else no one would be getting anything done because they’d be spending all day writing crap that very well should be built in. Simply put, the Ruby language doesn’t do a lot for you, the fix is to code it in Ruby and package it up as a Gem. Some things should be built back into the language itself, take for example, something like captalizing every word in a string. In both PHP and Python the code is negligible but in Ruby and JavaScript it’s a downright mess:

## Ruby

	"i want every word capitalized".split(" ").map {|w| w.capitalize }.join(" ")

## JavaScript

	"i want every word capitalized".replace(/\w\S*/g, function(chr){return chr.charAt(0).toUpperCase() + chr.substr(1).toLowerCase();})

I can hear a few of you pulling the old Perl addage “but it is only one line”. meh. Not a chance that I would leave JavaScript out of this one, as you may remember I don’t necessarily feel that Node.js is well-suited for web development. Both Ruby and Python fall into this same scenario where web development is accomplished mostly through frameworks. PHP on the other hand can be utilized without any additional frameworks, just pure PHP (I know there’s some asshole out there snortling about how he builds sites in Python from the ground up, no one cares that you had to build a web server, I’m content with nginx). Need a templating engine? PHP *is* the templating engine. Need to process strings (very common in web development)? PHP has a plethora of string manipulation functions. Need to… you get the idea.

Now this isn’t to say that the other languages out there are absolute junk and everyone should use PHP. I just wanted to point out that PHP does have it’s strengths just as other languages have their own set of weaknesses as most posts I see are the other way around. Just a bit more flamebait before I go:

* I will continue to use semi-colons when I write JavaScript until I have a viable reason not to. Sure beats having them at the beginning of the line occasionally, ick. pluh.
* Twitter was built on Ruby on Rails. Facebook was built in PHP. Twitter dropped Ruby for JVM. Facebook created HipHop. Your argument is obviously invalid.
* Eric Allman created the best indent style because it actually serves a functional purpose and saves keystrokes. Shut up about less vertical space and buy a larger monitor cheapskate!

That’s all, Happy Tax Day to all and to all a good night!
