---
layout: post
title:  Linode SSD vs. DigitalOcean
---

Time for another installment of my Linode vs. DigitalOcean series. The most notable improvement this go around is on Linode’s end by offering SSD Linux servers exclusively. This had been the pain point for many as DigitalOcean has been offering this since day one and Chris Aker had made it seem that SSD for Linode was quite a ways off because he didn’t want to offer his customers lower end consumer level hardware. Linode now offers hourly billing that is very much inline with DigitalOcean’s existing pricing as well. These improvements didn’t come without sacrifice as Linode is no longer offering 8 cores with every single plan as they did in the past. This too was more in line with DigitalOcean and opens up the potential of offering “cores on demand” as part of their extras. Let’s take a look at the side by side and see what we’re working with.

Just as before, I will be doing my side by side comparison using comparable plans on both Linode and DigitalOcean. Linode hasn’t budged on the price of it’s most inexpensive plan so the comparison will be of the Linode 2GB and DigitalOcean’s 2GB Droplet. This actually marks the first time that both hosting companies were offering the same amount of RAM for the money and I’ll be comparing both the twenty dollar and the forty dollar price points. Now let’s see the chart:

## For a single Jackson

<table>
	<tr>
		<th></th>
		<th>Linode</th>
		<th>DigitalOcean</th>
	</tr>
	<tr>
		<th>RAM</th>
		<td>2GB</td>
		<td>2GB</td>
	</tr>
	<tr>
		<th>CPU Cores</th>
		<td>2</td>
		<td>2</td>
	</tr>
	<tr>
		<th>Storage</th>
		<td>48GB</td>
		<td>40GB</td>
	</tr>
	<tr>
		<th>Bandwidth</th>
		<td>4TB</td>
		<td>3TB</td>
	</tr>
	<tr>
		<th>Network In</th>
		<td>40Gbit</td>
		<td>1Gbit</td>
	</tr>
	<tr>
		<th>Network Out</th>
		<td>250Mbit</td>
		<td>1Gbit</td>
	</tr>
</table>

## For a couple of Jacksons

<table>
	<tr>
		<th></th>
		<th>Linode</th>
		<th>DigitalOcean</th>
	</tr>
	<tr>
		<th>RAM</th>
		<td>4GB</td>
		<td>4GB</td>
	</tr>
	<tr>
		<th>CPU Cores</th>
		<td>4</td>
		<td>2</td>
	</tr>
	<tr>
		<th>Storage</th>
		<td>96GB</td>
		<td>60GB</td>
	</tr>
	<tr>
		<th>Bandwidth</th>
		<td>4TB</td>
		<td>4TB</td>
	</tr>
	<tr>
		<th>Network In</th>
		<td>40Gbit</td>
		<td>1Gbit</td>
	</tr>
	<tr>
		<th>Network Out</th>
		<td>500Mbit</td>
		<td>1Gbit</td>
	</tr>
</table>

In the past, DigitalOcean would typicaly trump Linode regarding the amount of RAM and bandwidth for the money while Linode’s strengths would be CPU and storage. With the recent updates from Linode they have been able to match or exceed in both the RAM and bandwidth categories depending on the plan. I personally find storage space to often times be more important than the amount of RAM, especially when it comes to scaling user-generated content. That’s one man’s opinion though.

What’s interesting to note are the network speeds. Linode is very forthright with their network and DigitalOcean doesn’t advertise their speeds as part of their packages. I had read on a few sites that they have a 1Gbit network but that has neither been confirmed by DigitalOcean nor does it mean that’s what they offer to their users. Because of this, I will not be taking these numbers into consideration for this comparison. I would like to add that Linode publishing their network in/out is probably a good indicator that they are offering a superior setup to that of DigitalOcean.

So on the apples to apples comparison of Linode versus DigitalOcean at the twenty and forty dollar price points, I’d say that Linode is very much the front runner just from the marketing material aspect. There hasn’t been much change in either company’s administration pages with the exception of DigitalOcean finally adding graphs (some time ago). They offer the same three graphs that Linode does in a fancier interface than that of Linode’s. Fanciness aside, Linode’s graphs still provide a more comprehensive look at your server, something which I favor.

Both companies have added the ability to remember your computer when you are logging in with two-factor authentication. It’s a nice feature to have (albeit lightens the security a bit) and since both companies are now offering it, we can consider it a wash.

That’s the side by side and in my opinion Linode is still the better choice, if for nothing else than Linode still offers way better “enterprise” features with the NodeBalancer and Linode Managed. For the money, Linode appears to be more superior than before but still can’t compete with DigitalOcean’s lowest price point of five bucks.

Thus far, my comparisons have been very focused on the plan offerings and not the performance itself. That being said, I am planning to do some more in depth benchmarks of the servers and the amount of time it takes to create and resize them in the future. Until then, assuming you found this article helpful, please use my referral codes for [Linode](http://www.linode.com/?r=5f682793582e82ce686747c851b998dc1f86a55b) and/or [DigitalOcean](https://www.digitalocean.com/?refcode=c35d26de972b) if you are planning to give either one a try.

The bang for my buck is still with bare metal from Hivelocity Hosting so here’s my [referral link](https://affiliate.hivelocity.net/Affiliates/gravityblvd) for them as well ;)
