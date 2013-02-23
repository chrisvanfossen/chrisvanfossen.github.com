---
layout: post
title:  Going full circle on Allman Style Indenting
---

I’ve been programming for quite a while now, and I’m very much the type of person that will change coding styles if another style or technique will benefit me more than my current way of doing things. That being said, I’ve web full circle on using [Allman style](http://en.wikipedia.org/wiki/Indent_style#Allman_style_.28bsd_in_Emacs.29) indenting.

The obvious question would be “why?” or potentially “ewww, why? that’s so ugly”, both of which are acceptable. To answer the former, because it satisfies an issue I’ve been having lately with vertical whitespace after declarations and conditionals. For instance, here is a non-formatted example:

	class Module {
		function DoSomething() {
			if (true) {
				echo 'Done!';
			} else {
				echo 'Not done';
			}
		}
	}

Nothing really wrong with that, but as of late I would format it like this:

	class Module {

		function DoSomething() {

			if (true) {
				echo 'Done!';
			}
			else {
				echo 'Not done';
			}
		}
	}

And sometimes even

	class Module {

		function DoSomething() {

			if (true) {

				echo 'Done!';
			}
			else {

				echo 'Not done';
			}
		}
	}

So yeah, I have vertical whitespace issues when it comes to code, and incidentally, I was half-assing the Allman style on my else statements (you can thank my current employer for that). After reading up on indenting styles I came full circle on the Allman style in it’s pure form. I say this because anyone from the way back machine would know that I used to code like this:

	class Module
		{
			function DoSomething()
				{
					if (true)
						{
							echo 'Done!';
						}
					else
						{
							echo 'Not done';
						}
				}
		}

Yeah past Josh really should be kicked for that one. Just for reference, and perhaps I’m late to find this out, but this is valid is valid code in PHP:

	class Module
	{
		function DoSomething()
		{
			// if (true) // <-- Note the comment!!!
			{
				echo 'Done!';
			}
		}
	}

What sucks is the code that I have to go back and update now :-/ That’s the price you pay when you have pride in how your code looks as well as it functions.
