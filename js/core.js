$(function()
{
	$('.year h2').on('click', function()
	{
		var div       = $(this).parent('.year');
		var is_active = div.hasClass('year-active');
		var year      = div.data('year');
		var fragment  = '#';

		console.log(is_active, year);

		$('.year').removeClass('year-active').removeClass('year-inactive');
		$('.posts-' + year).scrollTop(0);
		$('header').removeClass('header-inactive');

		if (!is_active)
		{
			div.addClass('year-active');
			$('.year:not(.year-active)').addClass('year-inactive');
			$('header').addClass('header-inactive');

			fragment = fragment + year;
		}

		if (window.innerWidth <= 1024)
		{
			location.href = fragment;
		}
	});
});
