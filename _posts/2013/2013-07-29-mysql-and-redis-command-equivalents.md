---
layout: post
title:  MySQL and Redis Command Equivalents
---

[Score another one for HitTail](/2013/06/10/hittail-review/) as this particular topic was their suggestion. MySQL (PostgreSQL, SQL Server, SQLite or any other RDBMS I didn’t list) and Redis are completely different beasts in regard to syntax and especially schema design (or lack there of). The following are just some common SQL statements and how you could accomplish the same with Redis (or vice versa). For these examples I’m going to work with a table called `users` in our imaginary database and a hash as well as some keys and sorted sets in our Redis equivalent.

## The Schema

### MySQL

	CREATE TABLE `users` (
		`id` int(1) unsigned NOT NULL AUTO_INCREMENT,
		`username` varchar(20) not null,
		`about` text DEFAULT null,
		`created_at` datetime NOT NULL,
		`updated_at` datetime DEFAULT NULL,
		PRIMARY KEY (`id`),
		KEY `username` (`username`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

### Redis

Right out of the gate, a major difference between the two is that Redis is schema-less so there’s nothing for us to set up.

## Creating the Data

### MySQL

	INSERT INTO `users`
		(username, about, created_at)
	VALUES
		('josh',  'i love to code',  NOW()),
		('jen',   'i love to read',  NOW()),
		('lizzy', 'i love to dance', NOW());

### Redis

Because Redis is a key-value store, we will have to maintain some additional keys for stuff like an auto-increment field and any indexes (in this case the username field) and for good measure a couple of sorted sets to store our created at and updated at values. I’d love to show you how to do this in pure Redis but that would require Lua scripts and I think that would over complicate this a bit. The following Redis examples will use `[phpredis](http://phpave.com/installing-php-redis-a-php-extension-for-redis/) but should be easy to port to another language. Additionally, you could pipeline the Redis commands but I am keeping them broken apart for simplicities sake.

	$user_id = $redis->incr('user:id');
	$redis->hmset('user:' . $user_id, 'username', 'josh', 'about', 'i love to code');
	$redis->set('user:username:josh', $user_id);
	$redis->zadd('users:created_at', time(), $user_id);

	$user_id = $redis->incr('user:id');
	$redis->hmset('user:' . $user_id, 'username', 'jen', 'about', 'i love to read');
	$redis->set('user:username:jen', $user_id);
	$redis->zadd('users:created_at', time(), $user_id);

	$user_id = $redis->incr('user:id');
	$redis->hmset('user:' . $user_id, 'username', 'lizzy', 'about', 'i love to dance');
	$redis->set('user:username:lizzy', $user_id);
	$redis->zadd('users:created_at', time(), $user_id);

I know what you’re thinking, “damn, that’s a lot of code just to store a small bit of data”. Turns out, you’re absolutely right, but if you want to use Redis as a replacement for an RDBMS and maintain the same level of flexibility to pull data, you have to work within the confines of Redis. Now that we have our data all set, let’s walk through some common use cases for interacting with both systems.

## Reading the Data

### MySQL

    SELECT `username`, `about` FROM `users` WHERE `id` = 1;

### Redis

    $redis->hmget('user:1', 'username', 'about');

Easy enough, but what about if we only know the user’s username to pull the same data?

### MySQL

    SELECT `username`, `about` FROM `users` WHERE `username` = 'jen';

### Redis

    $user_id = $redis->get('user:username:jen');
    $user    = $redis->hmget('user:' . $user_id, 'username', 'about');

That extra key we set when creating the records acts as an index by allowing us to easily look up the user’s unique ID by username. What happens if the user wants to change that username?

## Updating the Data

### MySQL

	UPDATE `users` SET `username` = 'elizabeth', `updated_at` = NOW() WHERE id = 3;

### Redis

	$redis->hmset('user:3', 'username', 'elizabeth');
	$redis->del('user:username:lizzy');
	$redis->set('user:username:elizabeth', 3);
	$redis->zadd('users:updated_at', time(), 3);

MySQL takes out the guess work by automatically updating the index on the `username` column but with Redis we have to be mindful of this change and issue the appropriate commands. We also added an item to a sorted set to track when the user last updated their information. We’ll circle back to pulling that data later in a bit, next up is deleting data.

## Deleting the Data

### MySQL

	DELETE FROM `users` WHERE id = 1;

### Redis

	$username = $redis->hmget('user:1');
	$redis->del('user:1');
	$redis->del('user:username:' . $username);
	$redis->zrem('users:created_at', 1);
	$redis->zrem('users:updated_at', 1);

Since we have data in a few places, we need to make sure we delete all of it. Now that we’ve been through the CRUD workflow let’s circle back around to that sorted set.

## Get Most Recently Updated

### MySQL

	SELECT `username` FROM `users` ORDER BY `updated_at` DESC LIMIT 1;

### Redis

	$user_id = $redis->zrevrange('users:updated_at', 0, 0);
	$user    = $redis->hmget('user:' . $user_id, 'username');

By storing the update time in a sorted set using the time as the score we are able to easily obtain the unique ID and then can use it to pull the username. [I’ve been known to use this technique](/2013/04/22/how-i-use-redis/#queues) but instead of storing everything in Redis, I grab the UID from Redis and the rest of the data from MySQL.

## Conclusion

So am I endorsing that Redis can function as a complete replacement for MySQL or other RDBMS? Sure, it can be done but as we saw there are some additional hoops to jump through and you have to be especially mindful when deleting data to make sure you delete from every touchpoint. You also have to remember that you will need to build out the indexes based on how you need to interact with the data, which can be tricky if you make changes in the future. Personally, I still favor a hybrid solution as mentioned above.
