---
layout: post
title:  Linode vs. DigitalOcean
---

I’ve been seeing a lot of these posts popping up recently and figured I’d weigh in on the matter. Since everyone seems to be including benchmarks of disk I/O and such I’ll not only omit those, but I’d like to discuss the services offered and some of my perceptions after moving from a Linode 512 to a 512MB Droplet.

## Price

Obviously DigitalOcean is offering a better pricing structure than Linode. Linode 512 with backup comes out to 24.95$ per month while DigitalOcean’s 512MB Droplet is a mere 5$ including their backup plan.

## Backups

Linode offers a backup service performing daily and weekly backups as well as on the fly snapshots for a fee (5$ a month on the Linode 512). DigitalOcean offers a backup plan which is presumably free as I was not prompted about an additional charge. Linode’s backups are reliable and I have had experience restoring them successfully (I did run into an issue once which I will discuss in a future post, long story short Linode made good). At this point, I have not restored a DigitalOcean backup but I have noticed that the daily snapshots are unreliable as every couple of days no backup is generated. I have not taken this to them yet because everyone I’m hosting on DigitalOcean are basic sites and all the code lives out in GitHub.

## Server Monitoring

As long as I’ve been with Linode (since 2009) there has always been a dashboard with usage graphs. Nothing of the sort seems to exist on DigitalOcean at this time.

## Security

Linode has provided me with a solid hosting experience, but also a secure one. The servers are not managed so I’m in charge of server security, but Linode has some tight controls on their administrative interface. Such security includes only allowing trusted IP addresses to gain access to the administrative side of things. DigitalOcean does not provide such security. Call me paranoid, but I love this feature.

## Load Balancer

Linode has something called Node Balancers, it’s their LBAAS (load balancer... you know the rest). DigitalOcean does not provide provide anything similar outside of setting up a new Droplet and running your own load balancer yourself. Linode’s Node Balancers are 19.95$ per month, so comparatively speaking rolling a new Droplet would be cheaper. Personally I like to offload as much of the server administration as I can so an LBAAS is a better choice. From a technology standpoint, the Linode Node Balancer requires all the backend servers to live in the same data center, so you’re at a loss if you want to route users through a load balancer back to a server closest to them.

## Regions

No brainer here, Linode has 6 data centers while DigitalOcean only has 2. Living in Florida, I opt for Linode’s Atlanta servers as they are closest to me. The closest DigitalOcean data center is in New York.

## Perceived Speed

As mentioned, I did not run any benchmarks so none will be provided here (Google it, there’s a lot them out there). I would like to mention that the time to set up a Droplet and the perceived speed while connecting and installing software seemed significantly faster than that of Linode. This very well could be due to how new the company still is and how light the load on their network is at this point. I’d also like to point out that a lot of the benchmarks I saw out there were comparing a Linode running a 32-bit OS while their Droplet was running 64-bit. Obviously not apples to apples IMO. I am personally running Ubuntu 12.04 LTS 32-bit.

## Operating Systems

Both companies offer a myriad of operating system options both 32-bit and 64-bit. Linode still recommends running 32-bit while DigitalOcean doesn’t seem to give any recommendation as to which is better suited. As mentioned, I stuck with Ubuntu 12.04 LTS 32-bit just so that all of my servers were the same (I did not leave Linode, I simply moved some of my smaller sites from a Linode 512 to a 512MB Droplet just to give them a shot). One thing that struck me as peculiar is that on DigitalOcean I found myself installing packages that I don’t remember installing on Linode, specifically vim and telnet. Not a big deal, but caught me off guard as those packages aren’t part of my standard setup scripts.

## Cores

From what I’ve read, most reviewers have dismissed the fact that Linode offers 4 cores and DigitalOcean only offers 1. Just seems like a no brainer that there’s an advantage by having more cores especially considering that many packages do take advantage of the additional cores (nginx, fastcgi/fpm, memcached).

## Scripting

Keep in mind, I don’t actually use it, but Linode offers StackScripts for automating server builds. From what I saw DigitalOcean did not have such a system, but they do have an API (as does Linode).

## Referral Program

Linode has an exceptional referral program and thus far I’ve earned over 200$ in referral credits. DigitalOcean does not have a consumer level referral program but according to their site they use Commission Junction. Obviously not ideal, especially when you do like something and want to kick all your friends a link after pestering them to switch.

## Track Record

Linode has a pretty strong track record of upgrading what a plan includes without changing the price of the plan. It wouldn’t surprise me if DigitalOcean were to increase their rates once their name is a bit more established. Also, as a Tech Stars graduate, there is a high liklihood that the company will end up being flipped in the next few years and who knows what would happen to the pricing then. Also, having scaled a website to over 11m PV/m on Linode, I’m confident that they are a proven hosting provider (especially considering they had to make some infrastructure exceptions for one of my servers). There’s a reason I keep the Linode logo in the footer of my sites hosted there.

## Conclusion

From what I’ve experienced, DigitalOcean doesn’t seem like a bad option especially if you’re cost conscious on the matter. Personally, it’s too early for me to drop Linode. Even if slower, Linode is still offering a more complete and stable infratructure which justifies the price in my eyes. I did receive 20$ in credit from DigitalOcean and am planning on sticking with them for at least the next 4 months assuming nothing catastrophic occurs.

And just because I’m a whore, [my Linode referral code](http://www.linode.com/?r=5f682793582e82ce686747c851b998dc1f86a55b).
