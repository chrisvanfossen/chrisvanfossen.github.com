---
layout: post
title:  Using Keyring Access on the OSX Commandline
---

If you’re like me, you probably have a private dotfiles that supplements your public dotfiles repository. It contains private values like API keys and [hopefully not] plaintext passwords. There’s even a good chance you’re using `git` submodules or a setup script to manage the inclusion of the private stuff. Well if you’re on OSX like I am, you can skip all of that hassle and just set up everything in your Keychain.

Let’s start by setting up a new item. You will need to launch Keychain Access and hit CMD+N to bring up the new item dialog. You can choose anything for the name but for the sake of demonstration I’ve chosen “secret”:

![New Keychain Item](/images/keychain-new.png "New Keychain Item")

Great, we have our secret password, now we can open up a terminal and get acquainted with talking to Keychain Access from the commandline. It only takes a single command, `security` to be able to grab the name of the account, the password or both:

	security find-generic-password -s secret

Provides a dump of data, but not very usable because what we really want is just the account name and the password. By default the password is not returned. To extract just the account name, we can pipe the output through a handful of commands:

	security find-generic-password -s secret | grep 'acct' | cut -c 19- | tr -d '"' | tr -d '\n'

Great, now we have the account name, but what about the password? Easy enough:

	security find-generic-password -s secret -w

You should be prompted to allow access to the Keychain when requesting the password. You can opt to prompt every time, trust the command accessing it (in this case `security`) or deny access (kind of defeats the point though).

Applying this in place of your private dotfiles is pretty easy. Anywhere you’re exporting a variable, you can replace the plaintext password / API key or whatever with a backticked call to `security`:

	export SECRET="`security find-generic-password -w -s secret`"

Works great inside of your `muttrc` as well, assuming you’re into that ;)

This obviously isn’t a great cross platform solution (but is great across OSX systems with iCloud Keychain), but I’m sure you can set up something similar on Linux. Fortunately, my private dotfiles are limited to stuff that I use locally so this is a pretty ideal setup for the time being.
