---
layout: post
title:  Oops, father has gone, wait for me, wait…!
---

So out of the blue last night, Pidgin (version 2.5.2) crashed on me and when I tried to relaunch it, it would only stay open for a brief moment. I hadn’t done any updates to my system since my last reboot, so I couldn’t imagine it was some new busted package. I tried launching it from the command line to find that there was a segmentation fault. Passing —debug ended up giving me a DNS error with a pretty nifty message, “Oops, father has gone, wait for me, wait…!” I went ahead and passed —nologin which got the program running, but as soon as I tried to connect with any of my services (AIM, Gtalk and IRC) it would bomb out, seemingly at random times. I systematically went through my accounts and found that a certain AIM account was the issue. It seemed whenever that account was connected, it would try to load the buddy information and then died on a specific person. I don’t think that person was necessarily the issue, as this morning I tried to connect that account, and everything worked out fine. Might have to call unsolved mysteries on this one.
