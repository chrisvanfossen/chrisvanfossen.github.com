$(function()
{
	// Toggles blog post years
	$('h4.toggle').click(function()
	{
		var table = $('table[data-year="' + $(this).data('year') + '"]');
		$('span', this).html($('span', this).html() == '+' ? '-' : '+');
		table.toggle();
	});
});
