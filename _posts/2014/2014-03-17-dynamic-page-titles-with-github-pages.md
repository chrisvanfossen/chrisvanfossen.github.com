---
layout: post
title:  Dynamic page titles with GitHub Pages
---

Ran into a bit of an issue today when deploying some changes to my blog. The home page, which was working just fine locally, was being treated as if it were a blog post page. What keyed me off to this was the title of the page which was “joshtronic by Josh Sherman” instead of simply “Josh Sherman”. I went through and tweaked some of my recent changes and the problem persisted, time to dump out some of my variables to see what may have been happening!

For those wondering, to accomplish dynamic titles I was comparing the `page.title` variable to a variable I set in my config named `site.github`. On the home page, the value of `page.title` defaulted to “joshtronic” and I set the config variable `github` (referenced as `site.github`) to be the same thing. Blog post pages would overwrite the title with the title of the post and that would cue the template to use `:title by Josh Sherman` instead of just my name.

Back to troubleshooting, when I dumped `page.title` and `site.github` what I saw was surprising. It seems that `site.github` was now being populated by GitHub with a bunch of information about my project’s repository as a JSON string. I love the thrill of troubleshooting and resolving an issue, but I could have saved myself a small bit of time if I would have just Googled it. When I did, found this help article regarding [Repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages) which was published 2 days ago. From what I can tell, this change didn’t immediately effect previously deployed pages.

Fortunately, the change has actually helped me completely eliminate the variable I created in `_config.yml` as I can now compare `page.title` with `site.github.owner_name`. In doing so, my blog is a bit less “Josh-centric” and ripe for the forking! The downside is that when running `jekyll` locally, `site.github.owner_name` doesn’t exist. It’s a minor inconvenience for me as I generally only run `jekyll` locally when proofing a post or the occasional tweak to the layout, which is somewhat of a rare occurrance.

I’m sure there are other ways to handle dynamic page titles and would love to hear about them, comment below!

*Amendment 3/31/2014:* Evidently had a brainfart the day I was working on this. Seems I forgot that I set the title of the home page to my username (joshtronic) and that’s why I my sanity was the way it was. I’ve since changed the title on my home page to “home” and updated my check accordingly. Now everything is working locally and is also a bit more generic!
