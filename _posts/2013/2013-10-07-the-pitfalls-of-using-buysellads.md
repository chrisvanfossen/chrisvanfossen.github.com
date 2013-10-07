---
layout: post
title:  The Pitfalls of Using BuySellAds
---

BuySellAds (BSA) is a platform for selling advertisements on your website. They take a mere 25% cut of sales and offer you a marketplace listing to help you gain exposure to potential advertisers. I love the idea and have _attempted_ to use them on a few occasions. As of this past weekend, I had to pull the plug.

One of my major draws to BSA was the ability to juggle multiple backfill ads (a/k/a remnant ads a/k/a backup ads a/k/a passback ads) which is very important since BSA doesn’t guarantee any sort of fill rate. I did have some success with selling some ads but I was relying on my other ad providers for the lion’s share of my revenue. The nice part about being able to juggle multiple backfill ads was that I could weight the probability based on revenue potential and maximize my earnings, even when I wasn’t earning anything from sales on BSA.

I had tried this out on single ad units and even swapped all of my ads out for BSA units. What surprised me is how borked my reporting became with my backfill ad networks. The straw that broke the camel’s back this past weekend was my backfill ads showing impressions at over 100% what the day’s actual site traffic was at. Huge red flag as this threw off the rest of my reporting. Upon pulling BSA, the numbers eventually leveled out (first full day without BSA involved, the reporting went back to normal). In BSA’s defense, I didn’t even bother to reach out over this and have decided that I’ll handle any direct sales myself as I wasn’t really pleased with the results in comparison to the number of issues I encountered.

Now let’s talk about a more technical problem that I ran into. The major red flag was in regard to the number of ad impressions being served through BSA. If you know anything about ads, it’s that if you have an ad at the top of your site and at the bottom, the top ad will most likely register more impressions than the bottom ad (never less). Why? Because the top ad is more likely to load since it’s immediately visible (some ads won’t load until they come into the field of vision by scrolling). With BSA, I wasn’t seeing this, my top ad’s impressions dwindled and dropped below that of the bottom ad which was being served direct and not via BSA.

Back to the reporting woes, this got me thinking, why in the world would the number of impressions drop? Let’s take a look at what has to occur before the ad in shown via BSA’s ad server:

1. BSA’s JavaScript ad code is placed on your site, +1 hop to BSA’s servers.
2. The BSA JavaScript is executed potentially loading an ad sold on BSA or one of the backfill options. Note: I’m unsure if the JavaScript returned has already determined the backfill options or if another +1 out to BSA has to occur.
3. If no BSA ad is available, an `<iframe>` is added to the page. This `<iframe>` loads the backfill page, another +1 out to BSA’s server.
4. Now we have a loaded `<iframe>` on our page which contains the JavaScript code for the backfill ad. +1 to load the JavaScript from the ad network.
5. Once the backfill’s JavaScript is loaded, we make our last hop to load any assets that the ad itself contains (images, flash, JavaScript). Our final request can actually weigh in quite heavily.

So to display an ad through BSA’s ad server we’re looking at least 5 network hops before our user is shown an ad. This actually happens quite quickly, but it’s still slower than if you were to display the backfill ad code directly.

The next major red flag here is that the ad is being served in an `<iframe>`. Why is that a major issue? Because most ad networks forbid loading ads via an `<iframe>`. It screws up any targeting to the content of the page and could easily be seen as fraudulent as you could easily be hiding ads in iframes to boost the number of impressions. The risk aside, the lack of targeting to page content can be quite detrimental. Irrelevant ads don’t appeal to the viewers and won’t necessarily generate clicks. I have a whole other theory on the lack of importance when it comes to contextual ads in a retargeted world, but I’ll save that for another post.

What’s my solution? Right now to juggle multiple ad networks, I wrote a small bit of logic to allow me to use some probability distribution. Ads are now being served faster since the logic is in the business logic not the front end logic. The only hops are the one to call the ad network and the then to load any assets for the ad.

What about the direct sales piece? We have a web form for advertising inquiries and as per usual, I’ll figure it out as we go. Yeah, we don’t get the benefit of the BSA marketplace but not all of our sites were even eligible for the marketplace. By handling the direct sales myself I can offer space on any or all of my sites. I can even offer more advanced purchasing options and even get into demographics targeting and all that fun stuff. Yeah I’ll have to build that stuff, but hey, that’s what I like to do :)
