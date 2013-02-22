---
layout: post
title:  Clock? We don’t need no stinkin’ clock!
---

So I’ve been using Xmonad for a little while now (one of these days I’ll blog about my recent OS / Window Manager trials) and the one thing that has left me a bit meh is the way the toolbars work.

First off, there’s a myriad of options. Some work better than others and some not at all, but no shortage. I started with and settled back to Xmobar, but I still wasn’t generally happy with how my toolbar looked, mainly in regard to tray placement in association to the clock and some system information. It just never felt as good as how stock OS X, Windows (<= Vista that’s the last I’ve experienced) and Gnome (gnome-panel as well as Gnome3/Shell) felt. Many of the bars I tried didn’t use an integrated system tray, so you end up being forced to size the tray and piecing it together with a bar that occupies the negative space.

Well the other day I said fuck it. I went ahead and got rid of the clock and the system meters (CPU and RAM usage) and just went to a very minimal setup with the workspace / layout / title on the left and the system tray on the right. This was all inspired by reading about how Thomas Edison didn’t have a clock in his workshop and how it helped his focus (something I learned about through a tweet by [Brian Burridge](https://twitter.com/#!/brianburridge) some time ago). I also removed the time from my BASH prompt just for good measure.

So a few days later with this setup, I must say that it takes some getting used to, but it’s definitely helped boost my focus and productivity. You can’t clock watch when there’s no clock to watch. The downside of this is making sure to leave the office at a decent time to be able to catch dinner with the family before the evening hack fest. For the most part, I have no idea what time it is (assuming I am not checking my phone) and not to get all Matrix-y, but because I am so disconnected I actually feel liberated a free.

I mentioned I also removed the system stats, they weren’t ever anything more than eye candy for me. When my system is running slow, I can feel it, no need for an “always on” indicator. I honestly wish I could get away from having the toolbar entirely, but I’m not quite ready to take screen shots and manage my wireless and VPN connections via the CLI. I am sure that I could manage without a workspace indicator and have been contemplating moving `trayer` from the upper right-hand corner to the lower right-hand corner.

If you’ve never tried it, I definitely recommend removing your system clock to help your focus and productivity. If you have tried it or if this post inspires you to try it, I’d love to hear your thoughts.
