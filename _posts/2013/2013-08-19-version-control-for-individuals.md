---
layout: post
title:  Version Control for Individuals
---

I find with a lot of folks I interact with, version control is considered something that you use when you are working on a team with multiple contributors. As an individual that is usually the sole contributor of my own projects, I have to disagree as version control is still a very important part of any workflow regardless of team size. Granted, it’s very rare that I find myself drudging through revision history to track down a change and for whatever reason, that process seems to be what folks typically associate version control to be. Fact is, as an individual using version control you can benefit from having a distributed backup and hooks to help automate tasks.

Now my workflow is a very humble one, I swear by “GitHub Flow” ([as documented here by Zach Holman](http://zachholman.com/talk/how-github-uses-github-to-build-github/)) which employs a few simple truths:

1. `master` is always deployable.
2. work in descriptively named branches off of `master`.
3. commit and push early and often to your branch.

I’ll stop there to interject that in the traditional flow you would include peer reviews and pull requests. There’s nothing wrong with either of those (especially for teams), but generally speaking as an individual contributor you can usually deem one or both as unecessary. As an individual you usually don’t have a formal peer review process and because you don’t need any official approval to merge back in, you can skip the pull request and just merge your branch back into `master`.

Even without this workflow, using version control (`git` in my case) allows you to have a distributed backup in place (as mentioned before). If you have a tendency to work on multiple computers (I use my MacBook Air at the office and my iMac at the house) you just need to be mindful to push your code back to the server ([rule #3](http://youtu.be/vKNcuTWzTVw?t=1m15s)) and it will be available to you on your other systems. Maybe you don’t need to use the revision history aspect of it, but everyone needs backups.

In the case of hotfixes to code, if you are dilligent about working in branches you will be able to easily switch gears, knock out a fix (in a new branch off of `master` of course) and merge it back to `master`. In this workflow `master` is always deployable which means it’s essentially a production copy oof your code. From there you can get back to working on your other branch and can merge in your hotfix by merging `master` back in. Even as an individual (unless you’re inhuman and never have bugs) you can benefit from being able to apply hotfixes easily. Speaking of the `master` branch as your production code, if you are so inclined to you could easily have an additional branch that you use for staging. Not always the case with nomads but the availability if there if you ever need it.

At this point I’m usually asked about merge conflicts when I’m branch juggling. Fact is, yes, merge conflicts can happen even if you’re the only contributor. The major advantage here is that as the only contributor you don’t have to over think the merge. As a whole, `git` does a fantastic job with automatic merges which makes it excentionally rare that I have to manually perform a merge.

I had mentioned using hooks and automating tasks but I won’t be going into a ton of detail on how but more of a why. Now I get it, not everyone has some task that needs to be automated, in my personal experience though, given enough time and as the size of a project grows something will come up that you will want to automate. No need to get into it, but I have some tasks that are performed in a `pre-push` hook. Because pushing code is so ingrained in my workflow, I don’t even have the think about it, just push my code as usual and it’s done! `git` supports hooks for different actions so you can work in logic automate your unit testing or some other manual task to make your life easier.

One last point and perhaps the least technical advantage to use version control as an individual. The ability to post code to a social code sharing site like [GitHub](https://github.com) or [Bitbucket](https://bitbucket.org) can be a very viable reason for an individual to use version control. Gone are the days of manually compressing releases and posting them to your project’s home page. Nowadays distribution is a code push away!

So that’s why I think individuals can benefit from using version control. I’d love to hear what compels everyone out there to use (or neglect to use) version control as a lone contributor on a project, comment below!
