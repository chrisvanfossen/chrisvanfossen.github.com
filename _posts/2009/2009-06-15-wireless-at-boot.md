---
layout: post
title:  Wireless Connection at Boot (pre-GUI)
---

A while back I got my wife a new laptop from Dell, got it set up with Ubuntu 8.10 and then proceeded to fight with YoVille! for a week or so prior. Since then, I still had a few action items on my list, specifically getting wireless working on boot / the network manager not prompting for a password on boot. See, my wife’s laptop is set up to auto login (yeah I know, gaping security hole). Said auto login would be great, but then she has to enter a password in to unlock the keyring so that the network manager can connect to our wireless network. Kind of self defeating IMHO. So I finally set out to fix the situation, and started with my laptop which is currently running Alpha 2 of Ubuntu 9.10. To get wireless working on boot, I added an entry to /etc/network/interfaces

	iface wlan0 inet dhcp
	wireless-essid <em>secret-router-name</em>
	wireless-key s:<em>even-more-secret-passphrase</em>
	auto wlan0

Superb! Except that the network-manager showed that I wasn’t connected. That’s when I met the wonderful network-manager replacement known as Wicd. In Ubuntu 9.10 (and perhaps in 9.04) Wicd is included in the repository so installation was as easy as pie:

	sudo apt-get remove network-manager network-manager-gnome
	sudo apt-get install wicd

After a reboot I had a wireless connection and a widget to show the status. Keep in mind this was on the beater laptop and not my wife’s. When I went to repeat the process on my wife’s laptop I ran into a mess of issues. Specifically, the network interface was called eth1 and not wlan0. Also, Wicd was not in the repository for 8.10 (going to upgrade her soon, but that’s another post) so I had to download it from the [Wicd SourceForge page](http://wicd.sourceforge.net/). All in all, it was a fairly minimal hiccup to get her laptop running as well, and with a small bit of hacking I was able to get the wireless auto connect working flawlessly when coming out of hibernation and suspends.
