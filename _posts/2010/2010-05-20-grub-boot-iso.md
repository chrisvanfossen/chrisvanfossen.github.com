---
layout: post
title:  Using GRUB to boot a Linux ISO
---

Since my latest Ubuntu upgrade totally hosed my machine, I decided to do a clean install instead of resolving the issues. Since my CD/DVD drive still absolutely hates me and my latest choice of CD media, I’ve had to search for options to be able to boot a Linux Live CD. Some of those options included installing from a USB thumb drive and via the network. Seems I don’t own a single thumb drive of considerable size, and I was a bit too lazy to invest the time into setting up my wife’s laptop act as a server for me to install from. Luckily for Google, I was able to find some alternative methods.

Now after some searching, I found a method of booting a live CD’s ISO using GRUB. I did so, and it worked great. BUT (you knew there was going to be a but) the ISO lived on the same partition that I wanted to install to as well as re-partition. Also, there will be no reference to the original article, because if you find it on the web and try to go there, the page completely re-directs to some fake Windows Explorer window acting as if it’s scanning your system for viruses. Since I had to fight with Google cache to get the actual content, those guys won’t be getting a shout.

To remedy my situation, since you can’t edit the partition table of a mounted drive and then install an operating system to it, I had to move the ISO to another drive. My system has 2 hard drives, so I was able to move the ISO to the other hard drive and then adjust the GRUB config to boot from there. Once I was set I was able to re-partition the drive (I wanted to add 3 new partitions, 2 for Linux installations and a third for my /home directory, this way next time around I can do a clean install of Ubuntu on the open partition and switch to it while retaining my /home directory). So at this point I know you’re wanting to know what I did and here it is:

1. Edit /boot/grub/grub.cfg (as root) with your favorite editor (e.g. sudo vim /etc/grub/grub.cfg)
2. Go to the end of the file and insert the following:

		menuentry "Linux Live CD" {
			insmod ext2
			set root='**(hd1,1)**'
			loopback loop **/linux-live-cd.iso**
			linux (loop)/casper/vmlinuz boot=casper iso-scan/filename=/linux-live-cd.iso noeject noprompt -
			initrd (loop)/casper/initrd.lz
		}

3. Reboot and select the new GRUB option
4. Send Josh a thank you email, and possibly flowers or something equally as romantic

Okay, step 4 is optional, but definitely in good taste. The bold bits in the above configuration code are things that may need to be adjusted depending on your system. (hd1,1) needs to correspond with your system’s hard drive number and partition number, and the ISO file would need to match the path and filename of the ISO you’re trying to boot.

So what’s the advantage? Well for starters it helped me get around the fact that I have a crapped out CD drive and can’t get it to recognize a disk to save my life. Second, and this have changed my whole outlook, the ISO’s boot ridiculously fast. Because of that, I’ve been using this method to sample live disks of other Linux operating system without needing to wait 10 minutes for them to boot up (perhaps 10 minutes is an exaggeration, but it always seems to take forever).

There you have it, booting a Linux ISO without burning a CD. I did do some experimenting, and you can boot the ISO’s from Windows based partitions (with a little tweaking of insmod) as long as you have GRUB installed as your boot manager. Enjoy the live CD speed boost!
