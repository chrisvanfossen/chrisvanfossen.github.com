---
layout: post
title:  CSS ALL THE THINGS!
---

Just realized that I’ve been spending quite a bit of time in the trenches with some CSS:

## My Projects

### [LESS Grid](https://github.com/joshtronic/grid.less)

Grid is a mixin for LESS, the CSS pre-processor (http://lesscss.org) for generating custom grid systems. The goal of the project is to create a grid system that reduces the amount of markup needed to use the grid. This is accomplished by making some assumptions about the structure of the markup. Columns are always <div> elements that default to spanning a single column and you can generate multiple grids instead of need to set span classes on all of the column elements. I created this to use it on a site that already uses a 5 column layout for most of the pages, so I end up using 2, 3, 4, 5 and 10 column grids. Also, class names are short to save some keystrokes.

### [colors.css](https://github.com/joshtronic/colors.css) and [properties.css](https://github.com/joshtronic/colors.css)

From time to time I get bored and put together stupid shit. These two projects are just that. colors.css is a list of CSS classes for each HTML color name and properties.css is shorthand list of classes for CSS properties.

## My Contributions

### [CSS3 Social Sign-in Buttons](https://github.com/joshtronic/css3-social-signin-buttons)

I love these buttons but I was in need of a Tumblr button (which wasn’t included). Added the Tumblr button as knocked out a couple of issues with the buttons being selectable and the Twitter logo needing updated.

### [Elements](https://github.com/joshtronic/elements)

Just wanted to add in my useful .debug mixin (slaps a single pixel red border around the element). Also went ahead and kicked up the README file to include all of the mixin documentation.

### [dBug](https://github.com/ospinto/dBug)

I’m not a fan of ColdFusion, but I am a fan of this port `cfdump`. I recently merged in some old code that I wrote at CrowdSavings that never got merged in. Added in additional CSS so that the output does’t get jacked when you’re using a stylesheet reset. Planning on reviewing the pending pull requests and merging those in soon as well since no one else has (and they are months old).

### [Anatomy](https://github.com/joshtronic/anatomy)

One of my favorite lightweight CSS. Fixed some bugs and added a minified version (now even lighter!)
