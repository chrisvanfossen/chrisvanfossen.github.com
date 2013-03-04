---
layout: post
title:  Lessons learned about directory based sharding
---

“Too many files?” is what I said in disbelief when I was having issues restoring a Linode backup a while back. I was sitting on over 10 million files after I had [moved a metric shit ton of data from MySQL to disk](/2012/06/01/drain-your-innodb-buffer-pool/) and restructured the data structure for the aforementioned data as well as user’s uploaded images. Linode’s backup service is great and the administrators have been quick to resolve my issues but the fact remained that I had way too many files on the server. It was evident while trying to migrate directory structures and purging old data as well as affecting the time it would take to generate and restore my Linode backups. Long story short, something needed to be done.

Before I discuss how I cleaned up my directory sharding, let’s talk about how I was doing so that generated such an epic number of files. It was a method I had picked up during my stint [working in the insurance industry](http://www.linkedin.com/in/joshsherman) from my boss at the time. It was something they had implemented in quite a few places but in hindsight, I weren’t dealing with the same volume of data as I was in those directories. The approach was simple, when you have a unique ID (UID) for something you are planning on saving to disk, create a directory structure based on said UID as such

	UID  = 12345
	path = /uploads/1/2/3/4/5/12345/

Yeah, I know, it’s directory overload, but I trusted the source. This is how I ended up with so many files as I was dealing with 10’s of thousands of UID’s duplicated across 3 different subsystems on the server. After the problem restoring the server and the time it took to restore the backup (upwards of 20 hours) I have vowed to dump that directory format and eliminated the flat files entirely so all that needed to be sharded were the user’s uploaded images.

After some Googling I found that there are two camps out there for the most part in regard to directory based sharding. First camp takes the first character (or first couple of characters) of the UID and groups all like files based on that. With a single character and numeric UID’s, this leaves you with 9 directories that will distribute your files. I didn’t necessarily care for this approach for the simple fact of how the code would have to be written. Didn’t seem that intuitive (speaking in PHP terms) to have to calculate the length of the string, then substring out the characters I’d want to use for the shards.

Second camp would use the modulus operator against the UID (obviously would need to be all numberic) to determine the directory to group the files in. Depending on the value you use, will be how many directories you end up with. I went with % 100 to give me some room for growth and for the obvious fact that the syntax is much simpler as you can mod any number regardless of length (unlike the substring approach). Thus far the approach has proved very solid and my time to generate backups has dropped from around 8 hours down to one.

The only downside to both of these approaches is that you can’t simply change the length (increase the number of characters you’re substringing or increasing the modulus value) to scale over more directories without having some issues finding the files programatically. To help combat this in case I have to revisit it in the future, I’m keeping track of a version number on the data. Now if I were to increase the value of the modulus from 100 to 1000, I can flag the newly uploaded data as the new version number to help map it back to the file system without additional lookups.

Lesson learned for me, even when approaching a problem you’ve worked with before, make sure to take scale into consideration and don’t feel bad about doing a small bit of research on the subject even when you think you have the best answer. I’m wondering if the guy I learned that original approach from is still using it or if he’s moved on. Guess I’ll have to look him up.
