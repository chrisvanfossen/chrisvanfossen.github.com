$(function()
{
	$('.year h2').on('click', function()
	{
		var div        = $(this).parent('.year');
		var year_index = div.data('index');
		var is_active  = div.hasClass('year-active');
		var year       = div.data('year');
		var fragment   = '#';

		$('.year').removeClass('year-active').removeClass('year-inactive');
		$('.posts-' + year).scrollTop(0);
		$('header').removeClass('header-inactive');

		if (!is_active)
		{
			div.addClass('year-active');
			$('.year:not(.year-active)').addClass('year-inactive');
			$('header').addClass('header-inactive');
			$('.year-nav').addClass('year-nav-inactive');

			fragment = fragment + year;
		}
		else
		{
			$('.year-nav').removeClass('year-nav-inactive');
		}

		location.href = fragment;
	});
});
