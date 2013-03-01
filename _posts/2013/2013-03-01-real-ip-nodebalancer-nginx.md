---
layout: post
title:  Getting real IP addresses using NodeBalancer and Nginx
---

This one’s pretty simple, but it’s not documented by Linode and most of the sites I found on Google were people ranting about a lack of documentation but failing to provide their solution.

The situation is this, I’m running sites behind a Linode NodeBalancer and I want the user’s real IP address in the error logs. To fix the issue with the access log is easy, you can create your own custom log format and use the X-Forwarded-For header that is set by the NodeBalancer. Turns out you can’t set a custom log format for the error log (I’m not entirely sure why) so I needed another solution.

The solution comes in the form of a module called [HttpRealipModule](http://wiki.nginx.org/HttpRealIpModule) that isn’t built by default but is included by the nginx package in the Ubuntu repository. If you’re compiling from source, you’ll want to include the `--with-http_realip_module` argument.

Once you have the module available, it takes as little as 2 lines in your `nginx.conf` to get the right IP address in your logs.

	set_real_ip_from x.x.x.x;
	real_ip_header X-Forwarded-For;

Obviously `x.x.x.x` needs to be the IP address that is coming from your NodeBalancer. What was somewhat confusing was that the IP address that was already showing up in the logs was not the IP address that was shown in the Linode admin. I’m assuming it’s a private IP address of the NodeBalancer.

Restart nginx and your error logs (and access logs if you have those on) will start showing the real IP address of the users.

Now that I have the real IP address, it’s time to get fail2ban installed so I can shut down some damned script kiddies!
