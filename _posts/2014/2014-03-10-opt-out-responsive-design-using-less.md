---
layout: post
title:  Opt-out responsive design using LESS
---

I liked Chris Coyier’s post [Opt-Out Responsive Design?](http://css-tricks.com/user-opt-out-responsive-design/) but really didn’t like the idea of having to qualify all of my selectors with a parent class to indicate that we should be using the responsive version of the site. I do favor serving the user a single stylesheet instead of subjectively loading multiple files but behind the scenes, I don’t mind maintaining a couple of files. With the power of LESS I am able to provide a single stylesheet for mobile / responsive and one for the desktop / full version of a site without having to maintain a dedicated stylesheet for each.

To accomplish this, I created two files, `mobile.less` and `desktop.less` to house my styles and two files that will be served directly to the user, `core-mobile.less` and core-desktop.less` that will `@import` the aforementioned files. The idea is that `mobile.less` will contain the base styles (thinking from a mobile-first perspective) and `desktop.less` will contain styles that would be referenced in a “large site” media query. Our “core” files look something like this:

## core-mobile.less

```less
@import 'mobile';

@media (min-width: 992px)
{
	@import 'desktop';
}
```

## core-desktop.less

```less
@import 'mobile';
@import 'desktop';
```

You can adjust the media query’s size or even include additional files that contains tablet or larger desktop-specific styles. I’m going to assume you know how to compile the LESS out to CSS so I’m not going to discuss that. Now within your markup you can subjectively load either the core file for mobile or desktop based on whether the user has opted out of the responsive design or not.

This approach won’t work for everyone, but I favor it at this point. If nothing else, I’m not a fan of editing styles inside of media queries and this approach keeps everything very flat. Why don’t I like it? Because I really hate having to contend with the same selector existing in different parts of the stylesheet. As the file grows and multiple media queries are introduce I find that the styles become more cumbersome to maintain.

How do you handle opt-out responsive design? Comment below!
