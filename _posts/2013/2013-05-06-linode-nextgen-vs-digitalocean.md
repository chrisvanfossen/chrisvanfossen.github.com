---
layout: post
title:  Linode NextGen vs. DigitalOcean
---

A lot has happened since February when I originally blogged about Linode and DigitalOcean. First and foremost, Linode has finished rolling out their “NextGen” platform in all of it’s glory. Linode also experienced a break in to their manager that allegedly resulted in credit cards getting stolen. I say allegedly because it’s the hacker’s word against Caker and company at Linode.

Things like this happen but I was a bit disturbed to hear that Linode stores encrypted copies of raw credit card numbers, with the passphrase to decrypt them never being stored electronically. I’ve worked with a handful of credit card processing companies and in every scenario the systems allowed us to generate tokens instead of storing even an encrypted copy of the credit card number. Those tokens are unique to you so they only work with your account, even in a scenario where the tokens are stolen it’s no big whoop.

So a little good and a little bad from Linode over the last two months. So what about DigitalOcean? Nothing to speak of really. Their blog hasn’t been updated in over 10 months and the few times I’ve logged in, their administration pages haven’t changed. I haven’t experienced any downtime with DigitalOcean so if nothing else, the lack of forward facing changes has help lend itself to some stability.

Linode’s recent 7 figure infrastructure upgrade included more cores (doubled to 8), more RAM (every plan doubled) and more bandwidth (10 fold increase) all for a mere $0.05 per month. The rate increase was a move to flat dollar pricing and let’s be honest, even with a small 5 cent change per instance the money can still add up. As of August 2012, Linode was boasting over 60,000 customers, I couldn’t find how many total deployed instances they have. Personally I have 4 Linodes and will be adding a 5th before the end of May but I assume most customers are only running one server. Even without knowing the exact number the change could easily cover a small salary or even better, epic company sponsored happy hours every Friday!

So how do these infrastructure changes compare to DigitalOcean? Well for starters, Linode no longer offers a 512MB plan so for apples to apples sake we’ll compare a Linode 1G and DigitalOcean’s 1GB Droplot.

## Price

DigitalOcean still has pricing on lock as their 1GB Droplet is half the price of Linode’s at only $10. Linode is always going to be more expensive because that $20 price point is built into their business model as how low they can go without sacrificing service. If paying a little more means free bumps a few times a year and nearly double all resources (nearly because storage wasn’t increased for NextGen) for virtually no change in pricing, it’s still worth it for me.

## Cores

Just as with the 512MB Droplet, the 1GB plan only has a single core. I’m still in the camp of the more cores the better. Upon rebooting my Linodes to jump from 4 to 8 cores there was a noticable jump in performance especially on my instance that handles image hosting and resizing. For most people a single core is more than enough, but for me Linode’s 8 cores is the clear winner. Also keep in mind that DigitalOcean’s larger plans do offer more cores and Linode offers higher priority as you scale up as well.

## Storage

One of the few categories that Linode falls short is the amount (and type) of storage that comes with their plans. Case in point, Linode’s 1G instance only comes with 24GB of storage compared to 30GB SSD with DigialOcean. It’s not a huge difference but if you factor in the SSD it becomes highly debatable. So debatable that Caker weighed in on SSD’s at Linode basically saying that due to the cost of enterprise level SSD’s they will not moving towards them just yet. He also mentioned that running servers off the equivalent of a laptop’s hard drive isn’t ideal. Pretty sure that was a jab at companies like DigitalOcean although I’m really not sure what’s under the hood with DigitalOcean’s hard drive selection.

## Bandwidth

I’m finding that a 10x increase in bandwidth is virtually unlimited for me and my 4 servers as I’m capping out between 3% and 5% usage per month from the pool. Both Linode and DigitalOcean offer 2TB of bandwidth for their comparable plans. DigitalOcean’s additional bandwidth costs are $0.02/GB and you pay for what you use while Linode sells additional blocks of bandwidth at 100GB for $10 a month or $0.10/GB in overage scenarios. To the best of my knowledge DigitalOcean does charge for all bandwidth in and out and between servers whereas Linode only charges for outgoing bandwidth and traffic between servers in the same data center is free. Even though it’s more expensive if you go over, Linode’s way of metering is superior.

## Security

Since the security incident last month, Linode’s further advanced their manager by adding two-step authentication. When I originally compared the two services, DigitalOcean didn’t offer much in the security department. Along with the new two-step authentication Linode still provides IP whitelisting with unknown IP addresses blocked by default. Advantage Linode because DigitalOcean still doesn’t offer any additional security outside of a username and password. Let’s just hope they aren’t storing plaintext passwords or credit card numbers!

## Statistics

Another pain point for me was the lack of statistical graphs and charts from DigitalOcean. Like their security, nothing has changed with them so you’re pretty in the dark out of the box (yes, I’m aware there are solutions for this out there). Linode still provides graphs for CPU, traffic (IPv4 as well as IPv6 if enabled) and disk I/O. Considering DigitalOcean doesn’t provide unlimited bandwidth, you’d think they could offer to show you how much bandwidth you’ve used for the month. This is assuming they are actually metering it, anyone out there ever paid a bandwidth overage to DigitalOcean?

## Backups

Linode’s backups still aren’t free ($5 for the 1G instances) but they have been very reliable even considering the hiccups I’ve ran into with them. DigitalOcean’s backups are no more consistent than they were a few months back. Backups are created most days but there are one to two day gaps every few days.

## Referral Program

Hasn’t really stopped me from recommending my cheapskate friends to DigitalOcean but there’s still no referral program. I do still refer folks to Linode because I still favor them, but I know cost is more of what drives people’s hosting solutions especially when they are hosting a small handful of non-revenue generating sites.

## Trial Plans

Due to overwhelming response, DigitalOcean had pulled their completely free trial plans forcing you to enter a credit card in exchange for $20 of credit that you can use (covers 4 months of hosting with their 512MB Droplet or 2 months on the 1GB Droplet). Since my original comparison Linode has added a completely free trial plan. You don’t need to enter a credit card, but you are only getting a few hours of hosting for free. Just enough to give you a taste of Linode’s awesomeness. While it’s great for folks that simply want to try Linode without any commitment or credit card I do favor the free credit as you can toy around with multiple server setups for free (until you run out of credit).

## Conclusion

As of this writing, I still have $7.76 in credit with DigitalOcean. Will I continue to use them after the trial? Absolutely! But for no other reason than price. Their 5 buck a month droplet is perfect for running all of my miscellaneous sites on and it’s saving my cheap ass $15 a month. Has it crossed my mind to migrate my larger sites to DigitalOcean? I like to keep my options open, so yes, I’ve thought about it. That’s all though, Linode’s been good to me all these years and their infrastructure is still my favorite. If I were to migrate from Linode it wouldn’t be to another VPS, I’d definitely want to make the jump to bare metal just for performance sake.

As always, [my Linode referral code](http://www.linode.com/?r=5f682793582e82ce686747c851b998dc1f86a55b). I’d love to pop a DigitalOcean referral code on here too, but well, you know.
