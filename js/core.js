$(function()
{
	$('.year').on('click', function()
	{
		var is_active = $(this).hasClass('year-active');
		var year      = $(this).data('year');
		var fragment  = '#';

		$('.year').removeClass('year-active').removeClass('year-inactive');
		$('.posts-' + year).scrollTop(0);
		$('header').removeClass('header-inactive');

		if (!is_active)
		{
			$(this).addClass('year-active');
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
