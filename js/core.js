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
	var date    = new Date();
	var hours   = date.getHours();
	var minutes = date.getMinutes();

	if (hours < 10)
	{
		hours = '0' + hours;
	}

	if (minutes < 10)
	{
		minutes = '0' + minutes;
	}

	var time = hours + '' + minutes;

	// Dawn / Sunrise (dark to light)
	if (hours >= 6 && hours < 8)
	{
		/*
		paintTheSky('#333', '#888', '#666', '#aaa');
		paintTheSky('#666', '#333', '#333', '#aaa');

		if (time < 0630)
		{
		//	paintTheSky('#000', '#888', '#666', '#aaa');
		}
		else if (time < 0700)
		{
		}
		else if (time < 0715)
		{
		}
		else if (time < 0800)
		{
		}
		*/
	}
	// Dusk / Sunset (light to dark)
	else if (hours >= 18 && hours < 20)
	{
		/*
		if (time < 1830)
		{
		}
		else if (time < 1900)
		{
		}
		else if (time < 1930)
		{
		}
		else if (time < 2000)
		{
		}
		*/
	}
	// Night time (invert)
	else if (hours >= 20 || hours < 6)
	{
		paintTheSky('#000', '#888', '#666', '#aaa');
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

function paintTheSky(background, heading, subheading, paragraph)
{
	$('body').css(    'background', background);
	$('h1,h3,h4').css('color',      heading);
	$('h2,time').css( 'color',      subheading);
	$('p').css(       'color',      paragraph);
}
