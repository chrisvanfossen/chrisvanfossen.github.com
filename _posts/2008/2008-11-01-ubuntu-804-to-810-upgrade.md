---
layout: post
title:  Upgrading from Ubuntu 8.04 LTS to Ubuntu 8.10
---

Well after a few days of not being able to run any upgrades on my installed copy of Ubuntu 8.04 LTS, last night things started moving. The upgrade process from Ubuntu 8.04 LTS to Ubuntu 8.10 took all of last night (I started it around 9PM) and on through this morning due to some interactive dialogs. The upgrade went surprisingly well compared to my previous Ubuntu upgrades (most of which ended up with me doing a clean install). This upgrade was not without it’s complications though.

First and foremost, the UbuntuStudio menu refused to upgrade at all. I know it’s not a package maintained by Canonical, but it was a flat out failure when trying to upgrade it. I proceeded with the rest of the upgrade, and then went on to remove all of the UbuntuStudio packages I had installed previously, and then reinstall them. No issues with the UbuntuStudio menu on reinstall.

Next came Compiz Fusion / Emerald Theme Manager. Compiz was running prior to the upgrade, and after the upgrade as well but Emerald Theme Manager was not running. After some Googling I found a nice [forum post](http://ubuntuforums.org/showthread.php?t=778118) that outlined the uninstall and reinstall steps. Still no dice until after I started Emerald Theme Manage with the —replace flag. In hindsight, I should have just tried that first, I ran `emerald` from the command line, but didn’t include the —replace flag, so that would have saved a bit of time. Long story short, Compiz Fusion with Emerald Theme Manager is back and I installed the Compiz Fusion Icon to help troubleshooting in the future.

At this point, my desktop is looking good and my window decorations are solid, “I wonder if my local development environment is hosed,” I thought. Sure as shit, it was, and kind of baffling to boot. Apache2 was up and running but all of my virtual hosts were pulling up the default document root. This was a surprisingly easy fix once I started digging into the Apache error log. Seems the way I had my virtual hosts set up, as <VirtualHost *> was not accurate compared to the NameVirtualHost directives in apache2.conf. I went ahead and added NameVirtualHost * to the end of apache2.conf and restarted. Now all my sites are up and running.

On top of doing the upgrade, I made the decision to (yet again) remove KDE entirely from my system. I wasn’t entirely sure of the entire list of packages to remove, so I used Synaptic’s section list and removed everything from all three KDE Desktop Environment sections. There are a small list of packages still installed when I search for “KDE” but it’s not enough to force me to put any more efforts into it. I’ll elaborate more on why I continue to go back to GNOME after numerous attempts with KDE on another day.

So that was my upgrade in a nutshell, most of it was just waiting, but the outcome was well worth it. I’m hoping that my next upgrade to Ubuntu 9.04 next year will be even easier as I really don’t have the time in my life to spend 10 hours trying to troubleshoot something that should just work (my Gentoo and Slackware days are long over).
