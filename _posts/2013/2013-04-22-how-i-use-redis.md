---
layout: post
title: How I use Redis
---

If you know me you know that I’m a huge proponent of Redis. I started using it in mid-2011 as the storage engine for a chat system I was building for SceneKids. Over the last year and a half or so I’ve utilized Redis more and more for many other sub-systems on the site. My initial draw to it were the various data types and the optional persistence. I’m going to discuss the different ways I’ve been able to successfully leverage Redis.

## Sessions

Probably the easiest way to implement Redis into your [PHP] stack is by using the Redis session handler. Unlike Memcached, you can enable persistence in Redis and provide a better experience for your users (reads: no more logging everything out of the site if you have to restart your box or the service itself).

The unfortunate side of things is that you will need to compile the PHP extension for Redis to enable the session handler. The advantage is having a native extension for Redis instead of using a [slower] PHP client like Rediska or Predis.

The PHP extension is [available here](https://github.com/nicolasff/phpredis) and installation is pretty simple. Once downloaded and extracted, enter the directory and run:

	phpize
	./configure
	make
	sudo make install

Once installed, you will need to edit your `php.ini` and add the line:

	extension=redis.so

Then you can enable the session save handler in your `php.ini` by changing the session save handler and path:

	session.save_hander = redis
	session.save_path   = 'tcp://localhost:6379'

You can specify multiple servers if you’re running a cluster, just comma separate them. There are also some other options that can be specified with each host, just check the [README](https://github.com/nicolasff/phpredis/blob/master/README.markdown). If I had to guess, there is probably a Ruby Gem out there to allow Rails sessions to be stored in Redis as well.

All subsequent code examples will be using the `phpredis` syntax.

## Counters

I’ve made the mistake of putting a counter field on a database table in the past. It’s a fairly innocuous thing to do when the field isn’t being updated that often (like once a day or so). If it’s something that is being updated every few minutes or sooner you’re going to run into a lot of database writes and possibly more reads if you’re invalidating a caching layer on every write.

Redis (like Memcached) has a command to increment and decrement a value. The obvious benefit when using Redis is the persistence and the speed to read and write (especially in high volume write scenarios) over an RDBMS. The commands are as follows:

	$redis = new Redis();
	$redis->connect('localhost', 6379);
	$redis->incr('counter');        // Starts at 0 then increments to 1
	$redis->incrBy('counter', 100); // Increments by 100 to 101
	$redis->decr('counter');        // Decrements by 1 to 100
	$redis->decrBy('counter', 25);  // Decrements by 25 to 75

There is also a command `incrByFloat` in case you want to increment by values with a decimal (e.g. 2.5). There is not a decrementing equivalent but you can increment by a negative value.

## Leaderboards

One of my favorite scenarios for using Redis is when creating a leaderboard / top scores list. The Redis sorted set data type is perfect for this scenario as it does all of the heavy lifting of sorting the data automatically. You can realistically get away with only four Redis commands to score the stores and recalling scores and ranks:

	// When a user has a new high score, add it to the sorted set
	$redis->zAdd('scores', 9001, 100); // 9001 is the score, 100 is the user’s ID

	// To pull the top 10 scores
	$redis->zRevRange('scores', 0, 9, array('withscores' => true));

	// To pull a user’s high score
	$redis->zScore('scores', 100);

	// To determine a user’s rank (+1 to make it human readable)
	$redis->zRevRank('scores', 100);

There’s not much to it and of course it’s fast and can be persistent. If you’re keeping track of something like the number of times a user’s profile has been viewed (in relation to other user’s profiles), you could use `zIncrBy` to increment the score during each view of the profile.

## Queues

Because of the awesome data types that Redis has, building queues is a very common use case. You could use the sorted set like we did above and set the score to the timestamp of the event or you could use the list type, which is ordered based on when and where you added the data. I generally use lists for the queues I’ve built.

When I originally built the dashboard on SceneKids I went with a basic scatter gather method to get the data to display for the user. As with most things, it was fine at the beginning but started to become problematic as the volume of the data increased and more touch points were added.

The original logic would grab the ID’s of all of a user’s friends when they would view the dashboard, then go out to each of the tables I wanted data from (status updates, images, journal entries and their respective comments). So upwards of 6 tables were being hit and subsequentially cached for 2 minutes. Far from a real time solution, and wasn’t going to scale much further as users on the site were starting to have upwards of 5,000 friends or more.

When rebuilding the dashboard I dropped the gathering and moved to a push queue where every update was pushed to a queue for each of your friends. Let’s say you have 10,000 friends and you posted a new status update. Every status update has a unique ID and I push a string `STATUS-#` (where `#` is the unique ID) to the dashboard queue for each of your friends. Yes, there are instances where I’m writing to Redis 10,000 times but the time it takes is negligible.

	foreach ($friend_ids as $friend_id)
	{
		// Writes to the user’s dashboard queue
		$redis->lPush('dashboard:' . $friend_id, 'STATUS-1234');

		// We only show 25 items, let’s truncate the list
		$redis->lTrim('dashboard:' . $friend_id, 0, 24);
	}

Now instead of trying to find the data I want for the dashboard, I can use the queue to extract the unique ID’s for the data and perform my database calls to collect the data (assuming it’s not already in the cache). This allowed me to drop sorting from the database (after I merge the data into an array I sort it in PHP) and pull the data while using the primary key for the tables. We could still have the same number of queries as before but the queries being run are more efficient.

## Final Thoughts

These are some examples of how I use Redis. There are still scenarios where I favor either MySQL or Memcached depending on what the data is and how I will need to interact with it. Redis’ speed and persistence make it a very viable RDBMS replacement in my eyes, assuming you have enough RAM to store your entire dataset.
