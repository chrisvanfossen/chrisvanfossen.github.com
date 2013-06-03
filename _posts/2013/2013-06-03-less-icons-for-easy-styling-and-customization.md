---
layout: post
title:  LESS Icons for easy styling and customization
---

Got a new project I wanted to share with everyone, it’s called `icons.less` (or LESS Icons) and it’s available for immediate forking and use [over at GitHub](https://github.com/joshtronic/icons.less). The project itself stemmed from my own desire to have a set of social icons that were easy to customize for different websites I may be using them on.

I’ve been through the trial and tribulations of trying to find an icon pack that had all of the icons I needed. Often times these icons packs didn’t come with a base template to work from and the icons are in JPG or PNG format at fixed sizes (sometimes a couple of sizes). This was problematic for me in many different ways. What if I wanted to change the colors on the icons? What if I wanted to use the icons are a size that’s larger than what’s provided? What if I need to make an icon that isn’t already present?

LESS Icons to the rescue! These icons are mostly CSS and can be configured right from the `icons.less` file. Need the icons at a different size? Want to add new icons? Would rather have different colors than black and white for the images? I got you covered, the project contains two Adobe Illustrator files (one in black [default] and one in white). Change the colors, add some new icons then export the artwork at whatever size you want. Once exported, update the `@icon-size` in `icons.less` and you’re off to the races!

The LESS file also contains some other variables that can be configured on a per project basis like the margin and padding, the style of the optional shadow the background color and the icon’s border radius. You’re welcome to hack up the remaining CSS as you see fit, common scenario would be adding a new icon which is handled by the `.sprite()` mixin. The mixin takes 3 arguments, the name of the icon (used in the class name) and the row and column for the icon. The sprite map is based on a 10x10 grid and the row and column numbering starts at zero (this one’s for you, [Dijkstra](http://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD831.html)!), I’m sure you’ll be able to figure it out :)

Aside from all of the hacking you could do on the LESS, there are a set of base classes to help you along. Here’s some usage examples:

	<i class="icon twitter"></i>
	<i class="icon facebook white natural"></i>
	<i class="icon github white circle"></i>
	<i class="icon twitter rounded shadow"></i>

Which will generate these:

![Example](https://raw.github.com/joshtronic/icons.less/master/img/example.png)

For a full rundown of the syntax and available styling classes and icons, please consult the [README](https://github.com/joshtronic/icons.less/blob/master/README.md).

As with most of my open source projects, this project is dedicated to the public domain and is free for all uses, commercial or otherwise. The logos themselves are property of their respective copyright owners. No form of credit required but you could make my day by sending me a link to these icons in action on your project!
