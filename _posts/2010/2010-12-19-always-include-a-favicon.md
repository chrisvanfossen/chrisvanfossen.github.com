---
layout: post
title: Why you shouldn’t redirect HTTP errors back to / or how I learned to always include a favicon.ico file
---

I have this nasty habit of being completely dismissive of HTTP error handling by not handling 404 errors and setting the ErrorDocument in my .htaccess file to point to / (e.g. ErrorDocument 404 /). For the most part, this has never been an issue shy of needing to explain why that missing page happened to show the main page. That is, until some recent issues with [updatemuch.com](http://updatemuch.com/).

The site was having a bizarre issue where the PHP session kept being reset which rendered the site completely useless, but only in Chrome / Chromium. I had thought that the issue stemmed from the [Services Twitter PEAR class](http://pear.php.net/Services_Twitter) that I was using when I originally built the site. A recent upgrade of the class proved to be buggy enough (was throwing errors in E_STRICT) to get me to migrate to [abraham](http://abrah.am/)’s [Twitter OAuth](https://github.com/abraham/twitteroauth) class.

Fast forward to today. The site was rebuilt using the new Twitter class, some enhancements were made and the site deployed. Oh wait, I forgot to test in Chromium… oh shit, same issue in Chromium. This is when I got to actually investigating the issue. Keep in mind, the home page of the site destroys the session, so I assumed something was hitting the home page after authenticating with Twitter. A bit of time troubleshooting later, I determined that it was in fact the home page being loaded, but no clue where / when it was happening.

At this point I started digging around my Apache logs to see what was being loaded. Between Firefox and Chromium, there was one major difference, Chromium was attempting to load favicon.ico which was not present. Wait, what?! It was forcefully trying to load the favicon? Why yes, yes it was, and because the file was not present, a 404 was hit and thusly, the home page loaded. This all happened outside of the flow of the browser loading the page. No FireBug entries, no indication that there was an error.

Yeah, at least the updates to the site brought some improvements aside from fixing this bug. In the future, I will also be including a favicon.ico file to keep my logs from being filled up with 404 errors. I haven’t tried it, but I’m curious if this is more of an issue with WebKit browsers than with Chrome / Chromium directly.
