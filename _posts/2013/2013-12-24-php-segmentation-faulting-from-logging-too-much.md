---
layout: post
title:  PHP segmentation faulting from logging too much
---

At least I think that’s what was happening. Today I made the somewhat calculated risk of upgrading my production server from PHP 5.3.10 to PHP 5.5.7. Scary stuff, jumping 2 point revisions like that but I was feeling cocky after jumping 3 point revisions to bring `nginx` up to the latest a few weeks ago. I test ran the upgrade process a few times on some throw away virtual machines and figured “fuck it, let’s do this shit” earlier today.

Aside from a small bit of downtime as everything was upgraded and `php5-redis` was installed, everything seemed to have went off without a hitch. That was until maybe 15-20 minutes later when my sites went unresponsive and there were upstream connection timeout errors all over my `nginx` logs. Initially I thought it was my new “leaderboard as a service” site, [LeaderBin](http://leaderbin.com), that was causing the issue. I went ahead and disabled where I had it integrated and restarted `php5-fpm`. So at this point we’re back online but I was still concerned that the issue was perhaps because of the new version of PHP, while dreading a rollback scenario..

Further investigation led me to believe that the problem was New Relic’s fault because I found a segmentation fault in it’s logs. Easy enough, let’s go ahead and uninstall New Relic just to be on the safe side. After that was purged, I _finally_ started to poke around the `kern.log` for the segfaults and found that `php5-fpm` was in fact segfaulting and New Relic was simply logging that fact. I ran `grep` for “segfault” and piped it out to `wc -l` every couple of minutes and realized that the segfaults were in fact still happening. Just great, and we have a Christmas Eve party to go to in a few hours! The error in question looked something like this:

```
Dec 24 16:08:50 aurora kernel: [14349405.602290] php5-fpm[6583]: segfault at 1000721 ip 00000000006ee087 sp 00007fff26f8d9a0 error 4 in php5-fpm[400000+798000]
```

The segfault error was pretty consistent so I tried searching for some of the specific numbers / codes thinking I could find something. No dice plus it had been years since I last had to troubleshoot a segfault in PHP, a little bit more Googling got me to the PHP page for how to use `gdb` to backtrace the situation. Seemed like a bit more effort than I was willing to put into it at this time so I wrote this command to grab the time of the most recent segfault and search my `nginx` logs for the same time:

```shell
grep 'segfault' /var/log/kern.log | tail -n 1 | awk '{print $3}' | xargs -I '$' grep '2013/12/24 $' /var/log/nginx -R
```

**BOOM!** That command revealed that there was a PHP deprecation message being logged. No biggie, it’s just a deprecation _warning_, right? Wrong, this particular warning was being logged a few times a second and the error itself was massive as the command was inside of a loop (don’t judge me!). That’s definitely part of the fun of running a decently-trafficked site. The error lines looked something like this:

```
2013/12/24 16:08:50 [error] 2339#0: *240267 FastCGI sent in stderr: "PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in classes/CustomString.php on line 18
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 19
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 18
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 19
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 18
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 19
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 18
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 19
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 18
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 19
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is deprecated, use preg_replace_callback instead in /classes/CustomString.php on line 18
PHP message: PHP Deprecated:  preg_replace(): The /e modifier is
```

No that’s not a typo, the error really was being cut off due to it’s size. The particular bit of code were 2 nested `preg_replace()` calls that would convert URLs to links and @mentions to links to user profiles. It was in a loop and was being ran when drawing the user’s dashboard of status updates. It’s probably worth investigating combining all of the strings perhaps in a JSON array and applying the logic once and converting it back to an array before looping, that’s gotta be a bit more cost effective than what I’m doing.

So at this point, I set out to fix the issue by using `preg_replace_callback()` (which I didn’t realize existed :/) while continuing to actively monitor the segfaults in the logs. A couple of minutes to update the code and the fix was live. Since the push went live the segfaults ceased (been about an hour as of the time of this writing) and I’ve come to the conclusion that PHP was logging so much so fast that it couldn’t keep up and thus took a shit in the form of a segfault. I will be reintroducing New Relic again soon but wanted to leave it off just until the dust settles.

Lesson learned, even though it’s just throwing a warning, I really need to pay a bit better attention to the deprecation list when upgrading and making sure that I get the code patched beforehand. Anyone else out there ever experienced this logging overload? I’d love to hear about your experience!

Oh, and Merry Christmas everyone!
