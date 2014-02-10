---
layout: post
title:  "Warning: Network TCP port is being used by /usr/sbin/php5-fpm. Possible rootkit"
---

Imagine my surprise to see this warning during my morning review of the rootkit checkers that run nightly on my boxes. The thing is, there were no other anomalies on the box aside from `/usr/sbin/php5-fpm` being bound to a port that was suspected of belonging to a rootkit. The fact is, by it’s nature, `php5-fpm` runs on ports that could potentially be the same that a rootkit is traditionally found on.

My server is configured with a fixed number of children, 64 of them. Each child will handle 20,000 requests before terminating and spawning a new child (to accommodate for any memory leaks). With this configuration, `php5-fpm` is terminating and spawning new children quite frequently. Each new child listens on a high port number (bunched heavily in the 40,000-49,999 range) and the potential for collision with a “rootkit port” is somewhat rare but it’s not entirely unlikely.

I did go through the motions of using `lsof` and `netstat` to peak into what was running, checked my logs, checked for abnormalities and bizarre login attempts and users. I even checked all of my sites to ensure that there were no files that didn’t marry up with the git repository and reran all of my rootkit checkers for issues. After all was said and done, I restarted `php5-fpm` and re-ran the rootkit checkers yet again. No issues, and no more `php5-fpm` listening on the suspect port.

I have been running `rkhunter` every 15 minutes and have been able to catch the occasional child process sitting on a suspected rootkit port. The port has been different each time and a different rootkit is being reported depending on said port. If you run `portsentry` like me, you’re probably no stranger to false positives from `rkhunter` unless you’ve whitelisted it.

Lessons learned? I’m thankful that I run multiple rootkit checkers because it turns out only `rkhunter` was barking about this situation. It also didn’t bark about any changes to the `php5-fpm` binaries, just the fact that something was suspect on the port. Remember that “warnings” can be just that. I do plan to closely monitor the situation but from what I can tell, `php5-fpm` will from time to time bind to a port that’s suspected of foul play.

Anyone else ever ran into this? I’d love to hear about it, comment below!
