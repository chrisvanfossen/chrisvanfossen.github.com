---
layout: post
title:  SceneKids.com - 8 months later
---

This post was supposed to happen 3 months after launch, pushed back to 6 months after launch, wait maybe at 10,000 users, better still at 15,000 users but well, shit happens. Here we are just over 8 months since the initial go live and now at over 17,000 users. A lot of things have happened in that time and hopefully I am able to remember all the pivots along the way.

To give you some back story, SceneKids.com is a domain that I purchased in 2002 and initially built out as a portal for Florida bands. MySpace came on the scene and ended up garnering a ton of attention from bands which fueled my decision to pivot. In 2006 the original concept was scrapped and replaced with a concert search engine. I was aggregating concert data from MySpace and Ticketmaster and allowed users to search by their ZIP code to see all the shows within a few miles of their location. This was later renamed to ShowsTonight.com and eventually scrapped in 2010. The decision to scrap that iteration was mostly based on my available time to work on keeping the spiders updated and the fact that most organic traffic was coming from searches for what was on television that night. Was always cool to see spikes in traffic during Sweeps Week, but not cool enough for me to revamp the site around television schedules.

So that brings us to the current adventure. SceneKids.com relaunched in late May 2011 while I was on a family vacation to St. Augustine. Before launch, there was about 3 weeks of development and about 5 months of thinking about it. Not planning, just thinking. Along with a few weeks of guerilla marketing on other social networks (a zero dollar advertising budget forces you to get creative).

What I had envisioned for the site was a virtual popularity contest very similar to [NSHVLL tech community](http://nshvll.org/) with a focus on sharing your micro-profile to get page views which affected how you ranked on the site. Within the first month it became very obvious that my vision of micro profiles and simplicity was flawed and that the site needed expanded with typical social network functionality to flourish.

What I’d like to focus on now are the things that I’ve learned along.

## I’m not saying Apache sucks, but…

At launch, SceneKids.com was running on a Linode 512 (512MB of RAM if you aren’t familiar), grossly inadequate after only a few months. Once the site started getting to 40 to 50 users on the site at once, Apache was starting to buckle and was lagging an additional 1 to 3 seconds on each page load. My initial decision was to move to FastCGI from mod_php to help alleviate the RAM usage, but I ultimately landed on switching to Nginx (thanks to [Sumit Birla](http://sumitbirla.com/)!). Not being familiar with Nginx, there was a slight learning curve (mostly with updating my mod_rewrite entries) but the end result was a website with nearly no overhead from the web server and a fairly minimal load from FastCGI. Moving forward I will only ever being using Nginx, LAMP is dead, long live the LEMP!

## Less users leads to more social problems

I know that seems ass backwards but when the site had less users, I was faced with more social issues among my users. When 2 people decide to raid a site and cause problems in chat and there are only 3 people in the chat room, the problem is perceived as a huge issue by those 3 users even though it’s only a mere 2 people causing problems. Fast forward to today when a room can have upwards of 30 people at any given moment, 2 people trying to cause a stir is practically unnoticeable.

Additionally, at one point the site had moderators in chat and the lesson learned there is that moderators can and probably will abuse their powers, especially when you’re dealing with 15 and 16 year old users. Less moderation forces users to learn how to deal with their problems. I added a “mute” feature to the chat room where you can simply block a user from chat and you don’t have to see what they are saying. Usage of this feature was low at first but as there was less super user moderation, users started to utilize the power to control their own experience more and more. Quite a few other “issues” that used to be handled by a human have been scripted for and are mitigated automatically and without ego.

## Cache! Cache! Cache!

Pretty simple one here. The best queries against your database are the ones you don’t make. Nearly every query on the site is being cached in some capacity. Even caching a query for 30 seconds can improve performance. Caching has helped me keep the site pretty snappy in comparison to some other sites I’ve ran into in the niche market social networking space. Better caching functionality is now being built directly into PICKLES (my PHP framework) so anyone using that can benefit from my last 8 months of experiences.

## Kids can be whiny bitches when they don’t get their way

For a while there, it seemed like every God damned change I would make to the site would lead to user backlash. I’m talking miniscule changes like making a button more accessible by moving it to the top of the page. “I like the old site better, go back to the old layout” I’d hear and I’d be dumb founded as to what I even changed that was so noticeable. Luckily this has died down and as of late the improvements to the site have been met with mostly praise.

Speaking of whining, remember how I said the site had a leaderboard initially? Wouldn’t you know it, people complained a ton about not being at the top of the leaderboard. And even when at the top of the leaderboard, some kid thought that I rigged the #2 position to pace him and keep him motivated to continue sharing his profile. I’d love to go into further detail but I’m going to end up using words like “ignorant” and “dogmatic” and “isn’t good at math” to describe the situation. Long story short, I abandoned the leaderboard because it seemed to confuse new users to the site and the off site sharing (Facebook, Twitter, et cetera) started to dwindle as the site grew larger and people could garner views from all of the users on the site already.

## If you can’t solve it with code, it’s a bad idea

As an elite software hax0r, I try to solve every problem with code. I fell short on this a couple of times during the last 8 months. Specifically with the previously mentioned human moderators and with something called the “Verified Badge”. The badge was issued to kids for posting a picture of them holding a sign that had their username and “@scenekids.com” to prove they were real and not using fake photos. This was great until some lying scabs started ‘shopping photos of celebrities with their “proof sign” to try to get verified.

I learned my lesson and the verified badge was retired because it was taking time out of my day to verify each and every photo that was sent to me. I’ve yet to come up with a good way to automate this, the closest is a “vouch system” where other users can verify that they know you personally, but I know that will be gamed somehow, but at least it would give the power back to the users instead of my time.

## PHOTO OF YOURSELF, Y U NO USE IT?!?1?!!!

Today’s internet is not the internet I grew up on and it seems like a good chunk of people on the internet exist behind a veil of anonymity. I can understand that some people may not have a camera or they are scared of all the perverts out there finding out who they are and where they live, but it seems most of the people that use fake photos are doing so for attention. Some just want to be cyber bullies but do it behind a mask and others usually proclaim that they “want to be loved for who they are” yet use a fake photo to get people interested.

Regardless of the type, it’s extremely hard to combat this stuff on a social network I’m finding. Some of it’s blatantly obvious at this point because I’ve seen the same damn photo 100 times before, but others, it’s hard to say. The last thing you want to do is question the validity of a user on your site so my general approach has been to be lax at best. If the user isn’t harassing anyone, they really aren’t being a problem. Eventually the site will have some better user reporting tools that help automate dealing with these issues. Hoping to have 25k users by that time :)

## Wrap it up Josh, you’re rambling…

Yeah, definitely a bit more long winded than I anticipated. I’m hoping the next 8 months are just as exciting as the first have been (pretty sure they will be).
