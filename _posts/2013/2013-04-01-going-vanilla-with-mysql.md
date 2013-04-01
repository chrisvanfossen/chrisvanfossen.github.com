---
layout: post
title:  Going Vanilla with MySQL
---

Over the last few years I’ve gotten down and dirty with MySQL’s config file, my.cnf. I read and re-read the MySQL documentation as well as any blog posts I could find on the subject. I was able to keep my connections low with caching and fought against the InnoDB buffer pool to make sure everything worked as efficiently as possible. For the most part, everything did work well.

What I continually noticed was that I was thrashing swap at least a few times a day, even though MySQL had more than enough memory allocated to it. The swapping I was seeing was reminiscent of the issues I had experienced with a very active MySQL server running on a RAM starved machine. Basically, the InnoDB buffer pool starts to act stupid under most of the configuration scenarios I’ve messed with. After upgrading to a server with 4GB of RAM, the configuration that perplexed me the most was when `innodb_buffer_pool_size` was in fact greater than the pool itself. As I understand things, if the pool can fit in memory, that’s the ideal scenario.

Not too long ago, out of shear frustration with the periodic performance dips, I went ahead and restarted MySQL with the vanilla configuration file that comes with Ubuntu. It felt like madness at the time, but amazingly the periodic swapping went away, MySQL’s been stable and running as efficient as ever. The fact is, I don’t necessarily consider myself a MySQL expert, but I thought I had done enough due dilligence to consider myself somewhat apt with the configuration options.

It was quite a humbling experience, but it does make sense. The default configuration of most software is often times completely acceptable to run with, even at higher volumes. Funny enough, I’ve heard similar stories about Oracle running optimally with little or no changes to the default configuration (funnier now that Oracle owns MySQL). Next time you’re having issues with a piece of software, don’t be afraid to swallow your pride and revert to the default configuration, it may save the day!
