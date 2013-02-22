---
layout: post
title:  The Zen of the Server Crash
---

I was talking to someone last week about how I attempt to keep cool when things fall apart. I call it “the Zen of the Server Crash” and as luck would have it, everything started to fall apart that afternoon.

First to go was our Internet connection at CrowdSavings.com HQ. It was a rainy day and Bright House was not handling the wetness very well. This was manageable at least, well until a deployment was borked because the connection was dropped in the middle. Easy fix, time to move on.

Next to go was our cron jobs, well most of them at least. The jobs are all ran on Rackspace’s CloudSites which means I can’t fix jack shit when it’s broken. I spoke with a Racker and he put in a trouble ticket for me at 5:30pm. I do some more digging that evening as I noticed the trouble ticket had not been touched at all and found that some of our most important jobs were the ones being affected (daily emails, credit card processing, et cetera). I’m usually not the type to do this, but I got online with another Racker and explained the urgency and made some threats about finding new hosting if it wasn’t resolved. It was resolved in roughly 10 minutes and all was well in the universe again.

This was all on Tuesday, Wednesday rolls around and I find myself in quite a pickle. Seems some code that I deployed weeks ago to optimize our checkout process and to ditch the use of MySQL’s views (which I find to be complete shit) was broken in very specific scenario. Took a small bit of digging but I was able to get the issue resolved, identified all the users that were affected and was able to salvage the latter part of the morning.

Sometime after a leftover piece of pizza the shit hit the fan yet again. This time our ESP Bronto had an API outage. Not a big deal, I coded for that. Wait a second, that code’s taking down the site WTF. Seems the code I deployed in October was causing an infinite loop as it kept retrying without any counters. Yeah, I suck, October 2010 Josh needs a lashing. Problem solved and by 10pm that evening everything was back to normal.

Now for the good stuff, what did I learn from all of this? Well first and foremost, if you deal with Rackspace keep a list of good and bad Rackers so you know what to expect when you get on the horn with them. The guy that put in the trouble ticket and didn’t fix the issue incidentally was on my shit list. They are all fanatical, but some more so than others. #2 log as much as you can without impacting performance. I mentioned earlier that I was able to identify the users that experienced the issue, it’s not magic, it’s just logging and it definitely comes in handy in a pinch. And lastly, if you interact with a third-party API and the interaction does not have to be real-time for the user, then don’t code it that way. API’s go down all the time and they can cripple you if you’re not prepared. There will be a follow up post about that in the future.

“But Josh, wasn’t the most valuable lesson that you should adopt _insert_trendy_new_type_of_ testing?” It’s crossed my mind, but for the most part, shit like this is a once in a blue moon scenario. At the end of the day, you can only test the scenarios you can dream up… I couldn’t have dreamed up that block of 48 hours even if I tried.
