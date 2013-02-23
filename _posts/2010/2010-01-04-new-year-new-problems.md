---
layout: post
title:  New year, new problems
---

Well my car didn’t start this morning. I think it’s because of the cold (I thought 30 degree weather in Florida was illegal) but we’ll see tomorrow. Now this all happened after I had a tech support issue from my wife, her laptop would boot up past the white Ubuntu logo and then remain on a black screen. Luckily she still gave me a ride into the office even after I was short with her (did I mention I stopped drinking and am snippy? that’s for another post I suppose).

So here I sit with a laptop that won’t boot. The wife advised that hitting ESC would bring up this “Busy Box command prompt thing with an alert on it”. The message said “ALERT! /dev/disk/by-uuid/ does not exist”. Sucks. So I pulled a trick out of my bag, circa 2000 when I was a phone tech for IBM End-User Support and reseated the hard drive (we used to call it “the voodoo” because it would fix just about any ailment on an IBM ThinkPad). No Dice. ::sigh::

Since the voodoo had lost it’s power in the last 10 years, I went ahead and booted the system with an Ubuntu live CD and got to work. Once booted, I mounted the partition and opened up /etc/fstab. Hey, there’s those screwy numbers and letters (a/k/a the UUID) again. I swapped those for the names I’m more familiar with (/dev/sda1 and such) and was able to boot the system.

That got me back in, but that didn’t really solve the issue, I mean Canonical uses the UUID for a reason, right? Well that’s the assumption. So from there I did what any logic person would do, and Googled around about the UUIDs. Seems all you need to do is run `blkid` to get a list of the UUID’s and the devices they represent. A quick edit of /etc/fstab and away we go.

BUT WAIT! The UUID’s that `blkid` returned were the same ones already in place that weren’t working?!? This didn’t seem right, but also seemed vaguely familiar from a previous scenario I was a part of.

Wait a second, the wife said she ran a package update a week or so ago? That threw up a red flag so I ran `sudo apt-get upgrade` and got a friendly “E: dpkg was interrupted, you must manually run ‘sudo dpkg —configure -a’ to correct the problem.” So I did… and reverted /etc/fstab back to using the UUID values. Rebooted and all is well, so whatever happened with the upgrade threw off everything. Go figure.

Oh, Happy New Year, let’s hope my car starts tomorrow!
