---
layout: post
title:  How I saw the test-driven light
---

Aside from dealing with financial transactions, I’ve generally avoided test-driven development as part of my day to day workflow. Why? The usual reasons, but mostly because I didn’t want to incur the overhead of additional development. As a single founder / developer you’re always looking for ways to lighten the workload in favor of building cool shit (I am at least) so the additional development overhead never made much sense to me.

Fast forward to recently when I upgraded PHP from 5.3 to 5.5 which resulted in quite a bit of downtime. That really opened my eyes to the fact that if I had some tests in place I maybe wouldn’t have avoided the crash, but potentially uncovered some other bugs that I probably haven’t come across yet. It took a while, but I absolutely “get it” now.

So now that I’m englightened, what am I going to do with all of my existing code? Obviously, I’m going to write some tests, oh so many tests! At present I’m writing tests for my PHP framework [PICKLES](https://github.com/joshtronic/pickles) as well as working on a major rewrite of the system. My approach has been pretty simple, go through each class and stub out tests based on the functionality and expected exceptions. This approach has been pretty good at reaching 100% coverage thus far.

Next steps after PICKLES is all tested up? Next up would be going through my sites and doing the same and any new development moving forward will include tests just to help from getting further behind. It will probably take a few months to get there but I’m excited about it. Once I’m done writing tests for the sites I can migrate them to the newest version of PICKLES and know for certain whether or not anything’s going to be fucked up which will be HUGE!

I know it took a while for me to get on board with TDD and appreciate the benefits but better late than never. In this new year, I’m attempting to be more productive and even though there will be more up front development, in the long run it will be worth it. Not just that, it’s also really cool to have a “build passing” badge on your projects. Soon enough I’ll have a coverage % one too ;)

Are you reluctant to embrace test-driven development? I would love to hear your reason(s) why, comment below. 
