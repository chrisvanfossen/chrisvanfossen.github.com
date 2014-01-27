---
layout: post
title:  Gravatar as an identicon generation service
---

If you’re not already aware, Gravatar is a free service that allows you to couple an image to your email address which can then be carried around the Internet with you. It’s great for site owners because then you don’t have to build out image uploading and storage and it’s great for users because it saves them some steps when setting up their account on your site. Gravatar can also be used in conjunction with an existing image upload / hosting setup as a fallback, either using the Gravatar image or falling back to a generic default.

On my social networks, I originally was creating gender specific default avatars for every site (now up to 18) but at a certain point settled on a generic set of icons to be shared on all of the sites. It was pretty lame and I wanted to do something that was a bit more fun. “Why not add some sort of identicon like StackOverflow or GitHub?”, I thought. It’s all well and good in theory but the fact is that those icons would need to be generated, stored on the server (wouldn’t want to generate them every time) and then served back up. Not to mention that I had no idea where to start on the algorithm and there’s not a ton of identicon PHP classes out there (at the time of my research).

The solution was pretty simple as it turns out you can send any string over to Gravatar and get a unique image back. I opted for the retro faces and instead of hashing the user’s actual email address (and potentially returning their Gravatar image), I am using their username and hashing that. I could probably go a step further and construct a fake email string that is site specific to make the avatars unique across all of the sites, but it wasn’t mission critical.

Simple example, let’s say my username is “joshtronic” (as it is on most sites). To generate a unique identicon for that username you simply `md5` the username (and optionally the site or service name) and potentially even a few garbage characters just to ensure it’s unique (I hugged it in brackets). Gravatar also provides a force parameter to always force the default avatar (on the off chance you generate a hash that returns an image, you’ll still get the identicon).

## “Email” string
[joshtronic@service]

## Resulting hash
9c42372c54588ae8b6f15bfbceeb3a1c

## Assembled Gravatar URL
http://www.gravatar.com/avatar/9c42372c54588ae8b6f15bfbceeb3a1c?d=retro&f=y

## Awesome Retro Gravatar
![Retro Goodness](http://www.gravatar.com/avatar/9c42372c54588ae8b6f15bfbceeb3a1c?d=retro&f=y)

And there you have it, an easy way to generate unique identicons via Gravatar.
