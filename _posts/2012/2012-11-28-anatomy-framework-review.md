---
layout: post
title:  "Review: Anatomy Framework"
---

From the developer, [Nick Justice](https://github.com/niix):

	Anatomy is a light-weight and responsive front end framework that invokes rapid development.

I don’t usually review anything on here, let alone a framework, but it’s also not often that I get to use something new that’s built in my backyard of Tampa, FL.

As of late, I’ve fallen in love with [Twitter Bootstrap](http://twitter.github.com/bootstrap/) and have been using it for some new projects I have in the works (and possibly integrating it into some existing projects as well) but one fateful day, I starred [Foundation](http://foundation.zurb.com/) on Github based on my buddy talking about using it on his next project. Nick reached out on Twitter and said I should check out Anatomy and that he was open to feedback (gotta love the hussle!)

I started to toy around with it on an existing site and it didn’t really fit my needs. Not the framework itself, but the fact that the site was built without a grid system and I couldn’t wrap my head around how to make it work nicely. What was cool was that Anatomy fell right in without much impact to my existing design. A few fonts got borked, but the overall look and feel remained intact. The last thing anyone wants is to include a new library on an existing project and have it break everything.

Take #2, I decided to redesign the [Gravity Boulevard](http://gravityblvd.com) site, and since I was going to scrap the entire site and start fresh, I decided to give Anatomy a shot. I started with the example index.html and modified from there. The default styles (fonts, colors, et cetera) were very clean and modern looking, great base to start with and it doesn’t fall into that “it looks too Bootstrap-y” scenario like with Bootstrap.

The one thing that I liked over Bootstrap was the naming conventions for the columns. Instead of .span2 or .span4, Anatomy uses English names like .two or .four. Overall the framework is exceptionally light weight and unobtrusive. The only negative I’d had thus far is that .nav.divider markup ends up throwing off a code validator I use in Vim. It’s just expecting there to be something inside the <span>’s. That’s my issue, not Anatomy’s.

I didn’t use them, but Anatomy does come with some button styles and Nick mentioned that there’s more to come. If you’re looking for a very non-obtrusive lightweight responsive framework get your ass over to Github to snag the code.
