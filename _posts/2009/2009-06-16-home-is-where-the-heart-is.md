---
layout: post
title:  /home is where the heart is… on the NAS
---

In an attempt to unify my desktop data on my newly acquired laptop I decided to try out sharing my /home directory from my desktop as a NFS and then mounting it as /home on my laptop. Originally this idea was flawed because the laptop was not connecting to the wireless router on boot (remedied by my previous post). Now that this wasn’t an issue, the idea didn’t seem half, sans the fact that I was bound to my home network. To get started, I added the appropriate packages to my client:

	sudo apt-get install nfs-common

and on my server:

	sudo apt-get install nfs-kernel-server

Next I went ahead and modified /etc/exports on the server to share out /home:

	/home    *(rw,sync,no_root_squash)

and started nfs-kernel-server:

	sudo /etc/init.d/nfs-kernel-server start

Once the server was ready to go, I added an entry in /etc/fstab on my laptop (client):

	192.168.1.4:/home /home nfs rw 0 0

I rebooted my laptop, logged in and was welcomed by a crippled version of my desktop machine in the other room. Crippled by the fact that I didn’t have the same set of packages install on the laptop, which was remedied by running the package installation portion of my SASSY (see previous post) script. All in all the system seemed to have a smidge of lag when opening files across the network and such, but overall it was very usable.
