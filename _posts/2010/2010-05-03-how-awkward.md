---
layout: post
title:  “Oh, how awkward.”
---

So I recently met an individual who took over a project of mine at my last job. Now let me preface this all by saying that this project that he took over was not my magnum opus or anything, just a fairly simple process for loading a gigantic spreadsheet into a DB2 table. Well the whole interaction was completely awkward, and from what I can tell the dude wasn’t impressed with the code of mine that he had to work with. No reason to be standoffish when meeting me though, or was it?

Well little did my new acquaintance know that I already knew the story about his interaction with my code well before our little meeting. See the code of mine that he had to deal with wasn’t overly complex, and at the heart of it, didn’t do that much. Data in, small bit of massaging and data back out. Well like most folks that I have had the pleasure of interacting with in the programming world (and myself often times as well) his first inclination was “I didn’t write this, so it must suck and need to be rewritten”. Well fuck you too. He did rewrite my code, and had to revert because the new code didn’t work at all. Not just once, but two or three times this cycle happened. Keep in mind that I spec’d the changes personally before I left, and the project was maybe a week’s worth of non-perfect engineering days. So instead of just adding support for the 4 new columns in the spreadsheet, this fuck rewrote the entire [working] system. Did I mention that his contract was not renewed?

Moral of the story? Don’t rewrite code unless you can make a difference. Don’t even think about rewriting someone else’s code until you fully understand said code. Let’s stop with the big dick competition and start hammering out code that will make a difference.
