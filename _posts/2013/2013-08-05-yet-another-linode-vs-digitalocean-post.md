---
layout: post
title:  Yet Another Linode vs. DigitalOcean Post
---

This has been turning into an every 3 month thing since I originally blogged about [Linode vs. DigitalOcean](/2013/02/24/linode-vs-digitalocean/) back in late February and then again about [Linode NextGen vs. DigitalOcean](/2013/05/06/linode-nextgen-vs-digitalocean/) in May. Not to mention when I [moved out of the cloud](/2013/06/24/moving-out-of-the-cloud/) in June when I switched to bare metal with Hivelocity Hosting. The fact is, both Linode and DigitalOcean, albeit not my main hosting companies, are both advancing at a great rate.

The most notable advancement recently has been that Linode doubled the storage space on every single plan. They still are not offering SSDs but the increase in storage capacity was a well deserved upgrade to stay competitive with DigitalOcean. That being said, and to switch it up from my other posts, let’s take a look at the plans from Linode and DigitalOcean at two different price points so we’re comparing apples to apples.

## What you get for 20$ a month

<table>
	<tr>
		<th></th>
		<th>Linode</th>
		<th>DigitalOcean</th>
	</tr>
	<tr>
		<th>RAM</th>
		<td class="center">1GB</td>
		<td class="center green bold">2GB</td>
	</tr>
	<tr>
		<th>CPU Cores</th>
		<td class="center green bold">8 (1x priority)</td>
		<td class="center">1</td>
	</tr>
	<tr>
		<th>Storage</th>
		<td class="center green bold">48GB</td>
		<td class="center">40GB SSD</td>
	</tr>
	<tr>
		<th>Bandwidth</th>
		<td class="center">2TB</td>
		<td class="center green bold">3TB</td>
	</tr>
</table>

## What you get for 40$ a month

<table>
	<tr>
		<th></th>
		<th>Linode</th>
		<th>DigitalOcean</th>
	</tr>
	<tr>
		<th>RAM</th>
		<td class="center">2GB</td>
		<td class="center green bold">4GB</td>
	</tr>
	<tr>
		<th>CPU Cores</th>
		<td class="center green bold">8 (2x priority)</td>
		<td class="center">2</td>
	</tr>
	<tr>
		<th>Storage</th>
		<td class="center green bold">96GB</td>
		<td class="center">60GB SSD</td>
	</tr>
	<tr>
		<th>Bandwidth</th>
		<td class="center green bold">4TB</td>
		<td class="center green bold">4TB</td>
	</tr>
</table>

As you can see, at the 20$ price point (Linode’s lowest price point) they are pretty comparable, you could favor either host depending on your own system requirements. Once you make that jump up to the 40$ tier, Linode becomes a pretty clear favorite if you need disk space, DigitalOcean the favorite if you need more RAM. Like anything, these results can be interpreted many different ways and the decision to choose a host should be based on your own server needs.

Now Linode wasn’t the only one to introduce some improvements recently, DigitalOcean has been expanding as well. Since the last post DigitalOcean has implemented two-factor authentication (eliminating one of my previously documented shortcomings) and added an additional data center (more notable is that it’s Google’s building). Sadly, they are still lacking in regard to providing system monitoring graphs and do not offer a product that’s comparable to Linode’s NodeBalancer.

Linode has also introduced a managed tier that carries a fee of 100$ per month per server and even more recently they have added a new server monitoring service called Longview. Longview seems to be the next generation of their current graphs and also carries a premium tier but can be used (with a less frequent update frequency) for free.

At this point, I am still leaning towards Linode if you need a more “enterprise” level host but DigitalOcean still wins out on price (and SSD if you’re into that ;). DigitalOcean still offers a 5$ a month plan that will work for most people with smaller sites, you can’t really scoff at that. It’s also worth pointing out that since I hadn’t spun up a DigitalOcean Droplet in a while, I received an additional bit of credit to entice me to come back. I appreciate that sort of hussle.

As always, here’s some referral links, if you happen to decide to sign up for any of the aforementioned hosts it would be greatly appreciated if you used my links: [Linode](http://www.linode.com/?r=5f682793582e82ce686747c851b998dc1f86a55b), [DigitalOcean](https://www.digitalocean.com/?refcode=c35d26de972b) and in case you are interested in going bare metal, [Hivelocity Hosting](https://affiliate.hivelocity.net/Affiliates/gravityblvd).
