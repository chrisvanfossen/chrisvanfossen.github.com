---
layout: post
title:  Script to Install Adobe Air on Ubuntu 64-bit
---

So after giving Gwibber an honest try for a few months, I’ve decided it’s time to move back to DestroyTwitter for my tweeting needs. Unfortunately, earlier in the year when I completely denounced Adobe products (specifically Flash) I went ahead and completely removed Air from my system. But alas, I forgot how the hell I got it installed on a 64-bit Ubuntu system the last time. Luckily, I found the blog post I used, and subsequently wrote a BASH script to automate the process completely. The original blog post can be found on Marco Valente’s blog and my script is as follows:

	#!/bin/bash
	#
	# Adobe Air Installer for Ubuntu 64-bit Systems
	#
	# Pretty sure the name says it all, but if not, here's some more detail. Adobe
	# Air is currently only supported on 32-bit Linux systems. Because of this you
	# have to jump through some hoops to get it running. Specifically, you need to
	# install 32-bit libraries to satisfy the dependencies of Adobe Air. This
	# particular script makes it as easy as running a single script.
	#
	# Based on the steps outlined at
	# http://marco.valente.co.za/articles/install-adobe-air-onto-ubuntu-64bit
	#
	# @author Josh Sherman
	# @url	http://joshtronic.com

	# Must run as root!
	if [[ $EUID -ne 0 ]]; then
		echo "This script must be run as root" 1>&2
		exit 1
	fi

	# Preps our directories
	cd /tmp
	mkdir adobe-air-installer-ubuntu-64
	cd adobe-air-installer-ubuntu-64

	# Pulls down the lovely Getlibs package
	wget http://frozenfox.freehostia.com/cappy/getlibs-all.deb

	# Installs Getlibs
	dpkg -i getlibs-all.deb

	# Installs our dependencies
	apt-get install lib32asound2 lib32gcc1 lib32ncurses5 lib32stdc++6 lib32z1 libc6 libc6-i386 lib32nss-mdns

	getlibs -l libnss3.so.1d --yes
	getlibs -l libnssutil3.so.1d --yes
	getlibs -l libsmime3.so.1d --yes
	getlibs -l libssl3.so.1d --yes
	getlibs -l libnspr4.so.0d --yes
	getlibs -l libplc4.so.0d --yes
	getlibs -l libplds4.so.0d --yes
	getlibs -l libgnome-keyring.so --yes
	getlibs -l libgnome-keyring.so.0 --yes
	getlibs -l libgnome-keyring.so.0.1.1 --yes

	# Pulls down the Adobe Air .bin installed
	wget http://airdownload.adobe.com/air/lin/download/latest/AdobeAIRInstaller.bin

	# Installs Adobe Air
	chmod +x AdobeAIRInstaller.bin
	./AdobeAIRInstaller.bin

	# Copies over the Adobe Cert Store library
	# This is commented out as the file was not present on my Ubuntu 10.04 system
	#sudo cp /usr/lib/libadobecertstore.so /usr/lib32

	# Cleans up our mess
	cd /tmp
	rm /tmp/adobe-air-installer-ubuntu-64 -rf
