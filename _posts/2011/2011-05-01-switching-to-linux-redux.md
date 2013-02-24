---
layout: post
title:  Switching to Linux, you’re doing it wrong (redux)
---

So after the public outcry that I’m a total asshole that just immediately starts yelling “RTFM you fucking n00b” based on my [previous post](/2011/04/11/switching-to-linux/), I decided to revisit each of my points and try to provide some helpful insight.

Before revisiting the points I’d like to state that the only way that questions can be answered is by actually asking them. Often times I find, folks will abandon Linux after one or two (what I consider) small snafu’s without ever lifting a finger to ask me a question about it.

Without further ado, a warmer, gentler guide to switching to Linux.

**Note:** All rebuttals are based on my recommendations to use Ubuntu, with other distro’s YMMV.

## It seems pretty clunky

Firstly, how old is the hardware you’re trying to run it on? If it’s fairly dated, you may need to think about running a “lighter” version of Linux. Although I haven’t used it, it seems [Peppermint](http://peppermintos.com/) has been gaining ground in the light-weight distro realm. I can personally vouch for either [Lubuntu](http://lubuntu.net/) (LXDE based) or [Xubuntu](http://www.xubuntu.org/) (running XFCE) for something a bit less intense as plain ol’ Ubuntu. Before you ask, let me tell you that Kubuntu would not be a valid alternative to Ubuntu if seeking something lighter weight.

If you’re running on extremely old hardware, going with a non-GUI Server Edition of Ubuntu may be a good route assuming you’re just going to use the box as a server. Additionally, with the release of Ubuntu 11.04 there is probably going to be a lot of “clunkiness” that is caused by Unity itself (the new default desktop). There is in fact a version of Unity that is touted as running on any setup called Unity 2D. Switching to it may alleviate any graphical issues you may be having with Ubuntu.

## None of my applications run on Linux

Depending on the application itself, there are a few different routes you can take. The most obvious and quite possibly the least painful would be to find an alternative to the application in question. Linux offers a wide variety of alternatives to most software out there. There are even commercial applications as well, so you’re not just limited to the free stuff.

For some applications, the alternatives just won’t cut it for you. If that’s the case, you may want to explore using [Wine](http://appdb.winehq.org/) to get the job done. Unfortunately, Wine can sometimes be cumbersome to configure / tweak to get your applications just right. The company CodeWeavers offers something called CrossOver (and now Impersonator?) to help with the headaches of running Wine with your favorite Windows software. At the time of this writing, there’s not a way to run Mac software natively within Linux (that I’m aware of).

Another alternative would be to run a Virtual Machine to run your applications on. This would help in the case of Mac software since you can run OS X as a VM (VMWare supports it). As per usual, there are multiple virtual machine applications out there for Linux, many of which are free to use (assuming you have a copy of the OS installation disc laying around). Perhaps not the most ideal approach, the VM will allow you to run your non-Linux application fairly easily, and in the case of VMWare, seamlessly with your native desktop.

## So I downloaded some source and can’t figure out how to install it

My first question would be “did you check the repositories for that?”. If not, you probably should. Ubuntu has something called the Software Center and it’s not only fantastic, but has a ton of applications ready to be installed. Let’s say you couldn’t find the package in the Software Center (examples would be Skype and Dropbox) there are a handful of ways to get your application installed.

The package you need may be available via a [PPA](https://launchpad.net/ubuntu/+ppas) (Personal Package Archive). PPA’s are additional repositories that can be utilized to install software. Most folks offering their application via PPA have instructions on how to do it, so there’s no need for me to explain it.

Assuming the package is not available via a PPA, you may need to download the package and install it yourself. When dealing with Ubuntu (and other Debian-based distributions) you will want to focus on DEB packages (*.deb). This is the official Debian package format and can be easily installed by double clicking the package once you’ve downloaded it (it’s just that simple).

If no Debian packages are available but packages for another distro are, you could entertain converting a package using alien. I haven’t used alien in forever as packages for Ubuntu and/or Debian are fairly standard, but the last time I did, it was easy to use and made short work of converting an RPM (that’s the Red Hat package format) to a DEB. If you go this route, you can install alien from the Software Center (you can [Google](http://www.google.com/search?q=alien+usage) it’s usage).

The last ditch scenario would be needing to compile the application from source code. Aside from needing to use the command line (so scary), compiling software from source is fairly simple. Typically source code is distributed with a README or INSTALL file that will explain the compile process (and often times any quirks you can experience). If not, Canonical offers a wonderful bit of documentation that [fully explains the process](https://help.ubuntu.com/community/CompilingSoftware). If you follow the steps above, there’s a good chance you’ll never have to get to this point.

## Bonus: I already have Windows installed and don’t want to mess that up

Repartitioning (like anal sex) can be a scary thing if it’s your first time. Luckily, Canonical put together [Wubi](http://www.ubuntu.com/download/ubuntu/windows-installer) for installing Ubuntu along side (technically within) your Windows. No partitioning necessary and you can give it all a shot.

The other option, assuming you can’t commit to Wubi, would be to simply use a Live CD. Live CD’s contain a full Linux OS and can be run simply by booting the CD. It’s a very noncommittal approach, but also gives you the opportunity to try multiple versions of Linux without taking the time to install it completely. Live CD’s do have a tendency to boot slower than an actual install, but once booted, the overall experience is fairly close. Keep in mind that not all Linux distributions have Live CD’s but generally speaking, most do.

## Rainbows, unicorns and puppy dog kisses

This concludes the friendlier, nearly PC version of my previous post. Hopefully a few folks find it helpful, if not, then read the other post, it’s far more entertaining ;)
