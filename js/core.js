$(function()
{
	// Toggles blog post years
	$('h4.toggle').click(function()
	{
		var table = $('table[data-year="' + $(this).attr('data-year') + '"]');
		$('span', this).html($('span', this).html() == '+' ? '-' : '+');
		table.toggle();
	});

	// Updates color scheme based on time of day
	var date  = new Date();
	var hours = date.getHours();

	// Dawn / Sunrise (dark to light)
	/*
	if (hours >= 6 && hours < 8)
	{
		$('body').css('background', '#ccc');
	}
	// Dusk / Sunset (light to dark)
	else if (hours >= 18 && hours < 20)
	{
		$('body').css('background', '#aaa');
	}
	// Night time (invert)
	else */ if (hours >= 20 || hours < 6)
	{
		$('body').css('background', '#000');
		$('h1,h3,h4').css('color', '#888');
		$('h2,time').css('color', '#666');
		$('p').css('color', '#aaa');
	}

	// Weather stuff, not in play yet
	/*
	jQuery(document).ready(function($) {
	$.ajax({
	url : "http://api.wunderground.com/api/60b3bea689ca9717/geolookup/conditions/q/IA/Cedar_Rapids.json",
	dataType : "jsonp",
	success : function(parsed_json) {
	var location = parsed_json['location']['city'];
	var temp_f = parsed_json['current_observation']['temp_f'];
	alert("Current temperature in " + location + " is: " + temp_f);
	}
	});
	});
	*/
});
