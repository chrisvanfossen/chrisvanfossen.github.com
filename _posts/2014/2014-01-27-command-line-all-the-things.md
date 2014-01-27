---
layout: post
title:  Command line all the things!
---

The start of 2014 has been an exercise in going back to basics for me. I’ve been re-evaluating my workflows when hacking and attempting to streamline as much as humanly possible. This has resulted in a ton of new aliases in an attempt to get my common CLI commands down to 2 or 3 characters as well as the adoption of a ton of new commands that I wasn’t even aware of a month ago. There has also been a ton of rework to my `vim` configuration, but I’ll save that for another post.

## Shell aliases

aliases are absolutely my favorite way to save keystrokes and often times allow me to cut out the thought process when trying to remember how to run some complex command that I only run into a few times a year. I’ve been a `zsh` user for some time now and `oh-my-zsh` has a ton of plugins that provide you with a ton of aliases but I’ve some of my aliases predate my `zsh` usage and some of the aliases provided just aren’t as short / intuitive as I’d like them to be.

Here’s a few of my favorite aliases right now:

**Flush the `memcached` server:**

	alias mcfl="echo 'flush_all' | nc localhost 11211"

**Unquarantine all the files in an OSX directory:**

	alias unquarantine="xattr -r -d com.apple.quarantine *"

**Push `git` repo using the currently checkout branch name:**

	alias gp="git rev-parse --abbrev-ref HEAD | xargs git push origin"

**Alias commands like `HEAD` on OSX:**

	for method in GET HEAD POST PUT DELETE TRACE OPTIONS; do
		alias "$method"="lwp-request -m '$method'"
	done

You can check out all of my aliases in [my zshrc](https://github.com/joshtronic/dotfiles/blob/master/zsh/zshrc#L19-L149).

## The `hub` command

The `hub` command is a `ruby` `gem` for interfacing with GitHub. It’s actually not something I use a ton of but I do love it so. The main reason I started using it is because it has the ability to easily clone a GitHub repository without needing the full clone URL:

	hub clone joshtronic/dotfiles

BOOM! the `dotfiles` directory is created and everything is cloned into it. If nothing else it saves some keystrokes. I had written a `git` script to do something similar a while back and was happy to drop it from my `dotfiles`. I plan to explore the `hub` command more in the future as I read that aliasing `git` to `hub` is a pretty fantastic thing.

You can find out everything about `hub` on the [official site](http://hub.github.com).

## GitHub Issues from the CLI

I like `hub` but the only reason I discovered it is because I was on the hunt for a way to handle GitHub Issues from the command line. Turns out that `hub` doesn’t do that but another `gem` that does. `ghi` allows you to view your open issues, create new ones, and all of that good stuff right from the CLI!

To make things even easier, I set up aliases for my common issue labels <span style="background:#009800;color:#fff;padding:4px 6px">Development</span>, <span style="background:#207de5;color:#fff;padding:4px 6px">Enhancement</span> and <span style="background:#e11d21;color:#fff;padding:4px 6px">Bug</span>. I generally stick to those 3 labels because that’s all I really need to organize and I only ever assign one label to an issue.

<span style="background:#009800;color:#fff;padding:4px 6px">Development</span> is anything brand new that needs to be built. <span style="background:#207de5;color:#fff;padding:4px 6px">Enhancement</span> is development against an existing piece of code. <span style="background:#e11d21;color:#fff;padding:4px 6px">Bug</span> well that should be obvious. I `alias` out `od`, `oe` and `ob` to show me open issues for each type and `nd`, `ne` and `nb` to open a new issue.

GitHub’s a pretty speedy site, but CLI interfacing is a faster workflow for me. OH did I mention you get to use your favorite `$EDITOR`? Anytime I can work in `vim` is a blessing. The source code and details about `ghi` are available [here](https://github.com/stephencelis/ghi).

## Simplifying my `zsh` prompt

Not too long ago I started to coerce my buddy [Justin Davis](http://www.maderalabs.com) into being a CLI-ninja and more recently he asked me about my prompt, specifically the <span style="font-family:monospace"><span style="color:grey">josh</span><span style="color:darkgrey">@</span><span style="color:magenta">nemo</span></span> that was on there. I was taken back by this because I had never given much thought as to why I needed not only my name on every damn line but also the name of my local machine. It makes sense on a remote server but even then, the only time I need `whoami` is when I’m not me.

Fast forward to last week when I decided to rework my `zsh` theme. I dropped the time from my prompt (as well as on my OSX menu bar, [yet again](/2012/04/19/we-dont-need-no-clock/)) and added some logic to selectively show the username and server name. Whenever I am logged in as myself, I no longer see my username and as long as I’m on a machine that’s `hostname` ends in “.local” I won’t see the server name either.

My current prompt is still 2 lines as I favor the consistency of my commands always starting in the same spot. The first line is the `pwd` in blue, `git` branch in yellow and a red ✗ if the `git` repo is dirty. There was no need to show a green ✔ (like I see on some prompts) because a clean repo doesn’t have a pending action item (committing). Second line is the prompt itself in grey. The hardest thing to get over is the lack of time but that’s definitely helped keep me tunnel visioned on the task at hand.

My `zsh` theme is available in [my dotfiles](https://github.com/joshtronic/dotfiles/blob/master/zsh/zsh-theme).

## Adding an email indicator to my `zsh` prompt

Over the last few months I’ve been juggling email clients continually going back to Gmail’s web interface. It works but all of the new email indicators I’ve ran into would alert on every single new email and that’s not ideal as it’s a unecessary distraction while trying to code. I also wanted to be able to see my number of unread messages from the command line as that’s where I spend the majority of my time on the computer.

To solve these pain points, I developed a very small script (so many pipes!) that checks Gmail from the command line by leveraging the OSX Keychain for security as most solutions I found included storing those credentials in plaintext which is not ideal at all. Once I was able to grab the unread count, I set it up in `launchd` to run every 5 minutes and my `zsh` prompt to show a 📩  in the `RPROMPT` if and only if there are 5 or more unread messages. At this point I had decided that having the actual count shown wasn’t really necessary.

I have yet to hook up my Google Apps email in there, but plan to do so in the same way. You can find [the check email script](https://github.com/joshtronic/dotfiles/blob/master/scripts/check-email), the [`zsh` integration](https://github.com/joshtronic/dotfiles/blob/master/zsh/zsh-theme#L17-L30) as well as the [`launchd` plist file](https://github.com/joshtronic/dotfiles/blob/master/launchd/com.joshtronic.checkemail.plist) all in my `dotfiles`.

You can use `crontab` if you’d like but from what I read on OSX `crontab` is just an interface for `launchd` and I had never written a plist file so figured I’d give it a go.

## Switching to `mutt`

Speaking of email, all of my trials and tribulations with Mail.app and my quest for the perfect email client that supports Gmail eventually led me to `mutt`. I’m still getting into the swing of things with it but like many things, it’s just amazing to be able to get so much done without leaving the comfort of my terminal.

Getting `mutt` to work with Gmail was pretty painless as I found a sample config in a [LifeHacker article](http://lifehacker.com/5574557/how-to-use-the-fast-and-powerful-mutt-email-client-with-gmail). Like many of the articles I’ve ran into, it relied on plaintext storage of your login credentials. Fortunately, `mutt`’s config is just a shell script and you can use commands to assign variables. OSX Keychain made another appearance in my `muttrc`.

My next step with `mutt` is to get multiple accounts working as I have both a Gmail account and a Google Apps account. From my reading thus far, you end up having to switch profiles or something like that. Doesn’t sound too bad but will probably result in a small change to my email indicator so I know which account I will need to be checking. If I had the time, I’d fork the source and hack it to show all of my email in a single view (a la Mail.app). I also need to work out a colorscheme. I’m using `solarized` for `mutt` but I’d much rather use `jellybeans` as I’m using it in `vim` and as my iTerm2 theme. Good chance I’ll port `jellybeans` to `mutt` this week ;)

My `muttrc` is available in [my dotfiles](https://github.com/joshtronic/dotfiles/blob/master/mutt/muttrc) as well. Since it doesn’t contain any login credentials, you should be able to use it as is, just be sure to set up a new Keychain item named “@gmail” to house your account credentials.

## ConCLIusion

I understand that the command line isn’t for everyone, but it is for me. It actually makes me wonder why I even run OSX and why I just don’t go back to Xmonad. What are my next steps on the CLI? At the moment I think I’m at a point that I’m polishing what I have and probably won’t be making any major additions for a while. That could change the moment I stumble across some hot new command though. Maybe someone reading this could suggest some? Comment below!
