---
layout: post
title:  DKIM with multiple domains with Exim4
---

Maybe my Google-fu was off when I was originally trying to figure this one out, but when searching for setting up DKIM for multiple domains on the same server all I came up with were complex ways to serve up domain-specific DKIM signatures. This seemed like overkill, especially going as far as to set up a database to house the data.

I’m sure someone will point out some terrible flaw in this, but I’m using the same DKIM signature across multiple domains by setting up the same exact domain key TXT record on each domain name living on that server. It worked, but the server was reporting that it was being sent from the domain I had configured as the dkim_domain. So, I made a small change to a single configuration file and then restarted exim4, good to go.

1. sudo vim /etc/exim4/conf.d/transport/30_exim4-config_remote_smtp
2. Change dkim_domain’s value to $sender_address_domain
3. Save and restart, sudo /etc/init.d/exim4 restart
