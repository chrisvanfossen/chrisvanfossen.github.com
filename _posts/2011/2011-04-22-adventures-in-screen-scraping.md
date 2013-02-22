---
layout: post
title:  "TeuxDeux: Adventures in Screen Scraping"
---

Been a busy week, still dedicated to blogging regularly though. Decided the best way to balance out my busy weeks is to post code that I had on github but decided to pull down as I wasn’t maintaining it, and no one else was following or forking it.

If you know me, you know one of my favorite thing in the universe is screen scraping and data mining. Below is an example of a very rudimentary screen scraper that at one time worked on [TeuxDeux.com](http://teuxdeux.com/) (good chance it no longer works). The point of the scraper was to harvest all of my existing list items so that I could transfer them to a different TODO app website [Odotay](http://odotay.com/). Unfortunately for Odotay (Pig Latin for TODO, I helped name it ;)) TeuxDeux.com ended up releasing a new version just prior to my exodus and I ended up punking out on migrating away from it (as of this writing, I still use it).

Now if you really know me, you know I’m not a huge fan of Ruby (the language itself is nice, Rails and the associated “community” makes me throw up in my mouth), so it’s a huge departure for me to be doing anything of value with the Ruby language. Turns out, I really like the Ruby gem known as [Hpricot](http://hpricot.com/), it’s pretty much all you need to write a quick screen scraping application. I’ve since ventured into using [Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/) for Python, but overall I still favor Hpricot and the simplicity of implemention in Ruby.

	#!/usr/bin/env ruby

	require 'rubygems'
	require 'hpricot'

	begin
		# Reads in source created by viewing source on teuxdeux.com and saving it
		# Use Firefox, as the Chrome view source mucks up the source
		file = File.new('list.html', 'r');

		# Converts the HTML into an object
		html = Hpricot(file)

		# Pulls out the undone list items
		list_items = (html/'li[@class="todo_item"]');

		list_items.each do |list_item|
			# This pulls the todo list item
			todo_item = (list_item/'p.teuxdeux').innerHTML

			# The following is code to generate queries to import teuxdeux.com data
			# to the wonderous http://todoapp.plan8home.com but could be altered to
			# support a migration to any other service

			# Creates a time object to set the created value
			time = Time.new

			# Swap me out with your user ID
			user_id = '%UID%'

			# Displays the SQL to migrate the record
			puts 'INSERT INTO todoapp.todos (user_id, name, eventually, created) VALUES ("' + user_id + '", "' + todo_item + '", 1, "' + time.strftime("%Y-%m-%d %H:%M:%S") + '");'
		end

	rescue Exception => e
		print e, "\n"
	end
