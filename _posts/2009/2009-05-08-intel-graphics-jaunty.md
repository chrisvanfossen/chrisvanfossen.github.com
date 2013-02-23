---
layout: post
title:  Intel Graphics Regressions in Jaunty, say wha?
---

A piece of me died after I upgraded from Ubuntu 8.10 to 9.04. Apparently, and serves me right for not reading up on it before the upgrade, the Intel Graphics drivers are completely crippled by a bug in the code. Wow, and this made it to the final release? I’m actually taken back by it a bit since Canonical Ltd. has earned my respect (for the most part) when it comes to being able to release very stable versions of Ubuntu every 6 months. What’s this really mean? It means I no longer have Compiz running because my screen goes black and glitches out if I do. Oh, and I know that Compiz is just “slick eye candy” to most of you, but there’s more to it than that. Window previews, real transparent terminals (huge for me), task switcher with live updates, and yeah, the cube rocks and is more for show than anything ;) Now I bet you’re saying to yourself, “Josh, there’s fixes all over the web right now for the issues”. And I say to you, yes there are, there’s a good chance I’ve tried the ones you’re thinking of, and no they didn’t work. Kernel switches, driver updates, config hacking, the closest I’ve gotten is Compiz works for like 10 seconds, and once Gnome is 100% loaded, it takes a shit. So now I’m faced with a big decision, reinstall Ubuntu 8.10 (I’m leaning towards this, since it will give me a chance to finally install my new hard drive), upgrade my desktop to a beefy Nvidia video card (high on the list since I need a new video card to play Portal, but doesn’t help the fact that I have two other computers in the house with Intel video) or abandon Ubuntu all together and find a new Linux du jour (highly unlikely as I’ve had my fair share of issues with Ubuntu in the past and am not willing to completely abandon what I generally consider to be a great product). To Mark Shuttleworth I say, I am disappointed, a bug this large shouldn’t have made it to a “stable” release, ever. And if anyone is wondering, `lspci | grep VGA` yields: 00:02.0 VGA compatible controller: Intel Corporation 82G33/G31 Express Integrated Graphics Controller (rev 02). Other than the Intel bug, the upgrade to Jaunty was generally easy going. Only other gripe was that /etc/hosts seems to have gotten wiped out, so my local development URLs didn’t work and had to be set up again.