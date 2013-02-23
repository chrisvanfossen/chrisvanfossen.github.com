---
layout: post
title:  Using SQL’s IN syntax to search multiple fields
---

This may not be something new for anyone, but figured I’d post it anyway. I needed to check for a certain date in multiple fields, instead of listing each one out, I used IN but used the value on the left side, and listed the fields in the parenthesis.

## Before

	SELECT id
	FROM table
	WHERE date1 = "1981-02-23",
	   OR date2 = "1981-02-23",
	   OR date3 = "1981-02-23",
	   OR date4 = "1981-02-23",
	   OR date5 = "1981-02-23";

## After

	SELECT id
	FROM table
	WHERE "1981-02-23" IN (date1, date2, date3, date4, date5);
