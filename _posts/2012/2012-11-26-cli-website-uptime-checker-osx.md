---
layout: post
title:  Command line website uptime checker using the Notification Center in OS X
---

Honestly, the title of this post covers all the bases of my pre-Turkey consumption proof of concept turned full on project. Just a simple Ruby script that parses a configuration file and checks to see if the site is up (returning 2xx or 3xx code). If the site appears down (or your internet connection is down) it will push an alert to the OS X notification center via terminal-notifier.

[Clone or fork uptime-notifier on Github](https://github.com/joshtronic/uptime-notifier)
