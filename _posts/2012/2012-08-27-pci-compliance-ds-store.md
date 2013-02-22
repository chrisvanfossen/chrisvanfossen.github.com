---
layout: post
title:  PCI Compliance doesn’t like the Desktop Services Store
---

The Desktop Services Store (DS_Store) as you probably already know, is a file that stores some metadata about the files in a directory in the OS X. I’ve taken a look at them, they seem pretty harmless, but in the realm of PCI Compliance they are a medium risk because they can reveal the directory structure (which could very well be innocuous depending on the site). Like most of the [PCI Compliancy challenges I’ve faced](http://joshtronic.com/post/18196907122), it’s a pretty simple fix:

## Apache

	<Files "^\.">
		Order deny,allow
		Deny from all
	</Files>

## Nginx

	location ~ /\.
	{
		deny all;
	}

Note, the above examples will deny access to all hidden files (.htaccess, .DS_Store, et cetera)
