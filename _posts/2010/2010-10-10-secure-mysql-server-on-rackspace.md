---
layout: post
title:  Setting up a secure MySQL server on Rackspace Cloud Servers
---

Recently I’ve been building out dedicated MySQL servers to combat some of the shortcomings we have encountered with hosting MySQL on Rackspace Cloud Sites (commentary on this will be saved for another post). During my research on what I could do to set up the server as securely as possible and after a few brain picking sessions with some of the fanatical Rackers, I was able to put together a fairly simple configuration that I’d like to share. Linux distribution selection is Ubuntu 10.04 LTS

Prerequisite, if you’re going to continue to run your web site on Cloud Sites and you’re simply moving from MySQL on Cloud Sites to a dedicated Cloud Server you will need to contact support to find out what your outgoing IP addresses are. I’m not entirely sure how to do this without contacting support, but the addresses correspond with where your site lives in the cloud. It only takes a minute and any Racker should be able to provide the information. There will be two IP addresses for that, and you’ll also want to make note of your local IP address(es) as we’re going to lock the server down so only the specified addresses have access.

At this point your server should already be built out, with Rackspace this only takes a few moments. Go ahead and SSH into the server as root and create a new user for yourself (as a sudoer) and set the password:

	adduser -d /home/user -m user admin
	passwd user

Log out as root and SSH back in using your new user account. It wouldn’t hurt to update all your packages at this point in time:

	sudo apt-get update
	sudo apt-get upgrade

Now we’re going to install MySQL and PortSentry:

	sudo apt-get install mysql-server portsentry

Remember those IP addresses we collected earlier? Now it’s time to use them. We’re going to start by whitelisting the IPs for sshd and mysqld:

	sudo vim /etc/hosts.allow

and add the following lines:

	sshd:1.1.1.1 2.2.2.2
	mysqld:1.1.1.1 2.2.2.2 3.3.3.3 4.4.4.4

Replace the IP addresses with your own, here’s a breakdown of what each IP corresponds to in my scenario:

	1.1.1.1 # My computer at home
	2.2.2.2 # My computer at the office
	3.3.3.3 # Rackspace Outgoing IP #1
	4.4.4.4 # Rackspace Outgoing IP #2

You can add in as many IP addresses are you need, but I try to keep it as trim as possible to eliminate all unnecessary points of entry (reads: points of failure).

Now that we’ve whitelisted our IP addresses, it’s time to block everyone else:

	sudo vim /etc/hosts.deny

and add the following line:

	ALL:ALL

Paranoid much? You could say that. Remember if your local IP address changes, Rackspace has a web console you can use to gain access again to update the whitelisting.

Configuring PortSentry is the nest part of our adventure. We’re going to make a few changes to the PortSentry configuration file:

	sudo vim /etc/portsentry/portsentry.conf

Find the line with the comment **Use these if you just want to be aware** and comment out the next two lines that start with **TCP_PORTS** and **UDP_PORTS**. Now find the line with the comment **Un-comment these if you are really anal**. It should be above the lines we just commented out, go ahead and uncomment them *you anal son of a bitch*. Final change to this file is to find the lines **BLOCK_UDP=0** and **BLOCK_TCP=0**. Set both values to 1 to block any scan attempts. Save the file and exit.

Restart PortSentry and we can be on our way:

	sudo /etc/init.d/portsentry restart

We’re good and locked down at this point, but (assuming you didn’t add them in already) we’ll want to add our MySQL users. I’m not going to go into great detail about this, but I highly recommend removing any users that use a wildcard for the host (%) and when you create users, explicitly set the host to the white listed IP addresses we used above.

Feedback is appreciated, especially if you have any tips on how to make this set up better.
