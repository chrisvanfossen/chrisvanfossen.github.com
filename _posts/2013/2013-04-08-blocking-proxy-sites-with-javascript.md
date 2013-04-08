---
title: Blocking Proxy Sites with JavaScript
layout: post
---

Social websites don’t always attract the most desireable patrons and often times those users opt to hide their identity (as well as blocking banner ads) behind a proxy server. There are quite a few free web-based proxies out there (generally ad funded, some have premium tiers) and they typically have a handful of IP addresses that the traffic is being served from. In the past (and most likely again in the future) I’ve had to block an IP or two (or range) to shut down a group of undesirable users.

This got me thinking that there had to be an easier way to combat the problem. My first thought was that it would be great to maintain a list of all of the proxy server’s IP addresses, perhaps make it community driven and block those IP addresses. Great in theory, except that would only work if there was in fact a community that was being vigilant with maintaining said list to ensure there’s no stale proxies on the list. Obviously not an ideal solution.

Insert JavaScript. After researching some web-based proxy traffic it dawned on me, these sites always seem to inject some additional markup on the page. What kind of markup? Usually some sort of browser bar at the top so you can jump to other addresses and depending on the site, some other stuff too. Couple of notable things that sometimes get changed or injected are the favicon and blocks of inline CSS.

Pretty simple approach to tell if your site is being displayed via a proxy site would be to check your markup with JavaScript:

* Check that the favicon value is as expected or count the number of icon `<link>` tags in the case that they injected a second one.
* If you know you don’t have any `<style>` blocks on the page, check to see if any are present.
* If you do have any `<style>` blocks on your page, just check that there aren’t more than expected.

I find the favicon to be the most reliable because a lot of ads and third-party widgets often times inject additional `<style>` and `<script>` tags, so YMMV with those. Because proxies are hiding your identity, they mask all assets so if you do have a your favicon set in a `<link>` the `href` is going to end up being changed to something like `/browse.php?u=ABC...123` which is just a script acting as a pass through.

Your code could look something like this (jQuery):

	<script>
		if ($('link[rel="shortcut icon"]').attr('href') != '/path/to/favicon.ico')
		{
			window.location.href = 'http://mysite.com';
		}
	</script>

“Will it stop everyone on every proxy?” Doubt it, plus I know it won’t work on VPNs. “Do you even use it?” As a matter of fact, I don’t actually use it on any of my sites. It has been tested against a few proxies and was more of a proof of concept that stemmed from my own curiosity on the matter.

On a final note, I would like to point out that I do understand the need for anonymitity and people’s concerns with identity theft. The fact is, often times people use proxies to hide their identity when they are getting their jollies by being complete assholes. Unfortunately, I don’t think there will ever be an ideal solution to those types of problems so you have to pick your battles accordingly.
