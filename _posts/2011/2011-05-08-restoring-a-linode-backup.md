---
layout: post
title:  Restoring a Linode Backup
---

Still kicking myself over this one, last night I accidentally dropped a database instead of just the table I wanted to get rid of. Now at one point, I had nightly database backups on my server, but when I added the Linode backup plan for $4.95 a month, I stopped that. In hindsight, I wish I hadn’t, but such is life. At this point, I really needed to get my database back (subscriber database for a new site I’m launching was in there) and without any local backups I figured I’d go ahead and restore my Linode from that morning’s backup (17 hours old). Up to this point, I’ve never had a need to restore one of my backups.

Overall the process went pretty smooth. The major gotcha was that you can’t restore a backup unless you have unallocated space on your Linode instance. Turns out, I did had 100% of the space allocated (that’s how I set it up years ago, keep in mind it’s only a 16G instance, space counts). There is an option to restore to a brand new Linode but that costs money so I went ahead and deleted my server image. I should have taken a snapshot right then and there (hindsight moment #2) in case the restore didn’t work.

At this point, I’ve shut my server down, deleted my main server image and began restoring the backup. Aside from how long it took to restore (over an hour) there wasn’t much else to worry about. Once restored, I booted her up and she seemed fine. The backup also restored a swap partition and the main image ended up showing up as only 12G. I assume that’s because there’s no need to backup the full 16G if it’s not in use.

After deleting the old swap partition, I went ahead and shut the server back down and resized it so that I was at 100% and rebooted. All was well. Funny thing about all this is that I was planning on rolling my own backup solution and then ditching the Linode backup plan. That’s not the case anymore, but I will be bringing back my local database backups when these sort of mishaps happen in the future.

Linode offers great documentation, but I figured I could still provide a solid abridged version of the process. Step #5 is completely optional but highly recommended. The following assumes you have the backup plan on your account already.

1. Log into Linode Manager
2. Click the Linode you need to restore from the list
3. Click the “Shut Down” button in the Server Status section
4. Click the “Backups” tab at the top
5. Assuming you’re not restoring from the manual snapshot, click “Take a New Snapshot Now”
6. Find the backup you want to use and click “Restore to…”
7. Under “Select” at the bottom click “Restore to this Linode” wait for the backup to restore

Now if it says “not enough free space” (like I had experienced) you will need to do the following:

1. Click the “Dashboard” tab
2. Under “Disk Images”, click “Remove” on the disk images you’re attempting to restore
3. Jump back up to #4 and proceed with steps 4 through 7

A little back story, I’ve been hosting with Linode since August 15th, 2009 and have only experienced one minor hiccup overall (they had an outage that affected me for an hour or so). If you know me, you know I highly recommend the company and the support staff (which I only interacted with once, and they had a 5 minute turn around on a weekend). The cost is fixed (no per cycle charges, meh), even the low end server has been able to handle my spikes in traffic and you get the ease of use of having a dedicated box to configure and abuse. They also provide free DNS hosting so you don’t even have to set that up on your server (configuring bind is on my list of least favorite thing). Oh and they have a referral program!

If you’re compelled enough to want to give Linode a try, [use my referral code](http://www.linode.com/?r=5f682793582e82ce686747c851b998dc1f86a55b).
