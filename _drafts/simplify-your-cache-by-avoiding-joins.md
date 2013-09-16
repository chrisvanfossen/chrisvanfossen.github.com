---
layout: post
title:  Simplify your Cache by Avoiding JOINs
---

I’ve long been a subscriber to the idea of avoiding JOINs (as well as VIEWs) like the plague and treating the RDBMS like a glorified NoSQL system. Why? Because I read it on the internet of course, and of course I can’t find the original article posted by Digg. The gist was they avoided JOINs for speed and simplicity’s sake. We’ve all been there, working with some 3 page query that someone was really proud of but now they are gone and the data being returned isn’t as expected. Maybe the schema changed, maybe the query never really worked, no one knows for sure. Not to mention the performance hit you can take when fields aren’t indexed properly or just the overhead required by JOINs even when properly indexed.

Now the big problem with abandoning JOINs is that you end up doing a ton of looping to grab values from one table to use on the next table. Here’s some [PHP-ish] pseudocode to demonstrate:

	// Grabs all the recipes for this user
	$recipes = $db->exec('SELECT * FROM recipes WHERE user_id = 1;');

	// Loops through and grabs the recipe IDs
	foreach ($recipes as $recipe)
	{
		$recipe_ids[] = $recipe['id'];
	}

	// Grabs the ingredients for all of those recipes
	$ingredients = $db->exec('SELECT * FROM ingredients WHERE id IN (' . $recipe_ids . ');');

	// Loops through and indexes the ingredients by recipe ID
	foreach ($ingredients as $ingredient)
	{
		$indexed_ingredients[$ingredients->record[
	}
