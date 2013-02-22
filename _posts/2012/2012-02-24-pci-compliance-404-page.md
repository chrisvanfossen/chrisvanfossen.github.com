---
layout: post
title:  PCI Compliance and the importance of a 404 page
---

TODO: fix previous post link.

As you may remember from a [previous post](http://joshtronic.com/post/16727579403), I typically rewrite my error traffic back to / instead of having a fancy 404 page. The logic behind this is that I’d rather get my users to a page that’s functional instead of presenting them with an error page, also I’ve yet to come up with anything cute / funny / witty enough to do with a 404 page to justify using one. Generally speaking, this hasn’t been a huge issue for the user experience, but it seems to occasionally come up as a technical issue.

The latest (and hopefully last as I’m planning on always using 404 pages moving forward) issue was related to PCI Compliance. I understand the value of security especially with something like credit card information, but what I don’t get is how something so important is so fragmented in regard to what’s compliant and what’s not. Compliancy scanning seems to be a big business, but it seems no two companies scan / analyze vulnerabilities the same way.

Case in point, we submit to a PCI compliancy and security scan monthly done by our hosting company using a third party to ensure we’re at the utmost level of compliancy. We pass this scan every month and even see a spike in blocked vulnerabilities at that time (makes me feel like it’s working). Well, once a quarter, our payment processor also makes us submit to a scan. Late last year we failed the scan :-O

Obviously this was a big deal, mainly because we recently switching hosting companies for a company that advertises and provides PCI compliant (as well as HIPAA compliant for all my insurance company peeps) hosting. Fun fact about all that, from what I can tell, there’s no hosting companies out there that are officially PCI compliant. The PCI Compliancy elders maintain a list of [“Approved Companies”](https://www.pcisecuritystandards.org/approved_companies_providers/index.php) which appears to be a list of approved scanning vendors (both companies I’ve worked with are on this list) and a second list of [“Participating Organizations”](https://www.pcisecuritystandards.org/get_involved/member_list.php) but if you read the fine print:

> The PCI Security Standards Council does not endorse these organizations or their business processes, practices, services, or products. Organizations that are listed on this site are not necessarily PCI DSS compliant.

and this is often what companies link you to from the PCI logo on their site :-/

Not to fear, we were given some time to resolve the issues, but the problem was we were seeing a ton of issues that weren’t even related to our hardware of software setup. Windows errors and all we run is Linux, HP vulnerabilities when all we have are CIsco routers. Totally frustrating. Our hosting company was very willing to work with us on the matter and declared the identified vulnerabilities as bullshit and were willing to attest to this. Unfortunately, this was around the holidays and I wasn’t able to get everyone on the phone from all parties to duke it out, so I had to dig a little deeper on the matter.

I went through the vulnerabilities a bit and started to Google around when I noticed a distinct pattern. Most of the vulnerabilities were [old cgi-bin exploits](http://www.hellboundhackers.org/articles/7-complete-set-of-cgi-bin-exploits-and-what-they-do.html) from the 90s. I’m not even sure they exist in the wild any longer, not on modern Linux distros at least ([I suspect that these exploits are currently hanging out at a coffee shop in Portland](http://www.youtube.com/watch?v=AVmq9dq6Nsg)). Well, as it turns out, these vulnerabilities were null and void, but because the server wasn’t throwing an error status when the pages were being hit, the scanning company was declaring them as vulnerable. Best as I can figure, the scanning company that passed us was actually attempting to exploit the scripts instead of just seeing if they existed.

Easy fix is to serve up a 4xx code on cgi-bin pages (assuming you’re not serving up anything from that directory). This example also includes a path to do the same for an exploit for unpatched HP routers:

	RewriteRule ^(cgi-bin|level)(.+)?$ /index.php?request=404 [NC,L]

The unfortunate thing for me was that evidently I’m the only person this has ever happened to as the scanning companies, our host and a ton of Googling didn’t produce any solutions (hence this post). Once the rewrite was in place, our scan came back with a single sequence number error. There’s a ton of documentation out there on it so I won’t go into detail. The fix for that is to link to the articles that deem it moot.

Hope this helps someone, as I spent a good couple of weeks dealing with this off and off.
