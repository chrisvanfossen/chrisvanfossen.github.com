---
layout: post
title:  Issue with SQLyog Job Agent on Ubuntu
---

No error message, it just says that the sync had started. What sucks about this issue, is that I ran into it with a previous version of SQLyog Job Agent (sja) but was able to troubleshoot it faster because the program would dump an error message. I have been messing with the issue very sporadically over the last few weeks and had not come to a conclusion. Some luckly Googling this afternoon let me to the same answer I had before, sja is looking for the MySQL socket in a different place than where Ubuntu thinks it belongs. Long story short, sja is now working again, and ShowsTonight.com’s database can be in sync more often. An honorable mention should go to [Maatkit: a toolkit of utilities and tools for MySQL](http://www.maatkit.org/) as I tried to indirectly fix my sja issue by migrating to using Maatkit. Unfortunately, I found the comparisons to take an awful long time, and didn’t feel it would suit my needs compared to sja. Good thing I got it working I suppose. It’s a pretty quick fix, one command:

	sudo ln -s /var/run/mysqld/mysqld.sock /var/lib/mysql/mysql.sock

For reference, I am working with Ubuntu 8.04 and SQLyog 7.02
