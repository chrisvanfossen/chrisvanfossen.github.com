$(function()
{
	$('.year').on('click', function()
	{
		var is_active = $(this).hasClass('year-active');
		var year      = $(this).data('year');

		$('.year').removeClass('year-active').removeClass('year-inactive');
		$('.posts-' + year).scrollTop(0);
		$('header').removeClass('header-inactive');

		if (!is_active)
		{
			$(this).addClass('year-active');
			$('.posts-' + year).addClass('year-active');
			$('.year:not(.year-active)').addClass('year-inactive');
			$('header').addClass('header-inactive');
		}
	});
});
