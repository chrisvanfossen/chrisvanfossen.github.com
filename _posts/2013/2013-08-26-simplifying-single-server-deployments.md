---
layout: post
title:  Simplifying Single Server Deployments
---

Last week I discussed [the importance of version control for individuals](/2013/08/19/version-control-for-individuals/) but something I didn’t touch on was how version control systems can be used to simplify and/or automate deployments. I’ve been through the different setups out there, using plain old `rsync`, leveraging [GitHub’s Post-Receive WebHook](https://help.github.com/articles/post-receive-hooks) to call a URL that would pull down the latest code, and even using `git` to push to deploy. Each has their own strengths and weaknesses but none of them ever felt like the right solution for me.

`rsync` albeit fast, is painfully slow when deploying very large codebases and seems to be worse if you deploy from multiple computers. My theory on that is the file list is no longer cached and it forces full scans each time. The webhook option was all right except that I don’t always want to deploy the code in `master`. Yes, `master` should be always deployable, but as a single developer, shit happens and sometimes you end up working in `master` instead of a branch. I also never liked the idea of there being a script on my server that would be running anything on the command-line. I did have the script locked down to only accept connections from GitHub’s trusted URLs as well as having a secret key that needed to be provided. Push to deploy with `git` was a pretty solid option but back [when I was in the cloud](/2013/06/24/moving-out-of-the-cloud/), I had multiple boxes and didn’t necessarily want to set up multiple end points (and then effectively have to wrap them in a script anyway).

Let’s fast forward to today, where at my current scale I can make it work with a pretty stacked single bare metal server. Being back down to a single server removed the need for distribution so I was able to ditch my old deploy script entirely. Now this old script I speak of was custom for my main group of social networks and not for all of my sites. The rest of my sites, I would SSH out and pull down the latest code from `master`. My goal was to create a script that I could use to deploy any of my sites with zero configuration. The big advantage to getting this done is that I always* checkout `master` to `/var/www/mysite.com` where `mysite.com` is the name of the repository. I check it out so that if I ever have to make a production hotfix, I can just check it back in and push it upstream.

* Maybe not always, recently I started deploying to a staging environment, more on that below.

In regard to checking out code from `git`, I don’t use any deploy keys but I do leverage [ssh-agent forwarding](https://help.github.com/articles/using-ssh-agent-forwarding). This keeps things very simple, especially considering it’s just me deploying. Basically my local key gets used to authenticate me on the server and gets passed in and used when pulling down code from GitHub. Please note that my new script does require that you have `PubkeyAuthentication` enabled, configured and your public key(s) out on the server.

So onto the script, the deploy script itself started as a single line (well 2 if you count the shebang):

	#!/bin/bash
	/usr/bin/ssh -pXXXX server "cd /var/www/$1; git pull origin master"

To use it I simply run `deploy mysite.com` and voilà! the latest code in `master` is pulled down to the server. Now if you happen to have a different username locally than you do on the server you’d need to include that in there (`username@server`). Also, not required, but I recommend moving SSH to an alternate port for security’s sake (`-pXXXX` would need to be changed to your custom port or removed entirely if you’re using port 22). Yes, I’m aware that I’m lazy for not checking if any command-line arguments are passed in. Fact is, the script will fail when it attempts to do a `git pull` from `/var/www` so the check is only really a nice to have. It also fails if the site doesn’t exist on the server, so the bases are actually covered.

As mentioned earlier, I usually only deploy production sites from `master` but recently I started running a staging copy of a site to help aid in testing against production code without fully deploying to the production site. To accomplish this, I ended up adding a couple of extra lines so that I could pass in an alternate branch name:

	#!/bin/bash

	if [[ -z "$2" ]];
	then
		BRANCH=master
	else
		BRANCH=$2
	fi

	/usr/bin/ssh -pXXXX server "cd /var/www/$1; git pull origin $BRANCH"

The script works the same way as before, but optionally you can pass in the branch name you have checked out, `deploy mysite.com mybranch`. Unfortunately I was running this for a week before it dawned on me that I could just sniff out the branch name, so the final version of the script looks like this:

	#!/bin/bash
	/usr/bin/ssh -pXXXX server "cd /var/www/$1; git rev-parse --abbrev-ref HEAD | xargs git pull origin"

That’s how I deploy sites in my single server setup. Thanks to consistent naming of repositories and directory structure I am able to deploy any of my sites with this generic script and because of public key authentication and ssh-agent forwarding the whole thing can be done without any additional user input. This doesn’t handle any of the setup of a new site, unsure if I’d want that in this script or if perhaps I’d write a `setup` script that could be used initially. This also doesn’t handle any restarting of services, just getting code out on the server. You could easily add in logic to restart your web server or whatever, but you would also have to enter a password in to get root access unless you are logging in with root (which you shouldn’t be!).

This is obviously a very simple example of how to get code out on a server and it could be expanded upon to loop through multiple servers or perform some other actions as well. I don’t see the need in running a complex deployment system just for a single box and I hate configuring stuff for ever new site and I like having control of when code is deployed. It’s great when a single line of code can accomplish all of your project goals :)
