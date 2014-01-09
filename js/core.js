$(function()
{
	var width_original;
	var margin_left = '0';
	var year_offset = 0;

	resizeColumns()
	$(window).resize(function(){ resizeColumns(); });
	
	function resizeColumns()
	{
		$('header').removeClass('header-inactive');
		$('.year').removeClass('year-active').removeClass('year-inactive');
		$('.years').css('margin-left', 0);
		$('.year-nav-newer').addClass('year-nav-inactive');

		if (window.innerWidth > 1024)
		{
			var column_width = window.innerWidth / 5;

			$('.years').width(column_width * $('.year').length);
		}
		else
		{
			var column_width = '100%';
		}

		$('.year').width(column_width);

		width_original = column_width;
	}

	$('.years, .year-nav')
		.mouseenter(function()
		{
			if (window.innerWidth > 1024)
			{
				$('.year-nav').addClass('year-nav-visible');
			}
		})
		.mouseleave(function()
		{
			if (window.innerWidth > 1024)
			{
				$('.year-nav').removeClass('year-nav-visible');
			}
		});

	$('.year-nav-newer, .year-nav-older').click(function()
	{
		var negative      = $(this).hasClass('year-nav-older');
		var column_width  = window.innerWidth / 5;
		var margin_offset = Number($('.years').css('margin-left').replace('px', ''));
		var max_offset    = 0 - (($('.year').length - 5) * column_width);

		if (negative)
		{
			margin_offset -= column_width;
			year_offset++;
		}
		else
		{
			margin_offset += column_width;
			year_offset--;
		}

		margin_offset = Number(margin_offset.toFixed(2));

		if (margin_offset <= 0 && margin_offset >= max_offset)
		{
			margin_left = margin_offset;
			$('.years').css('margin-left', margin_offset);
		}

		if (margin_offset == 0)
		{
			$('.year-nav-newer').addClass('year-nav-disabled');
		}
		else if (margin_offset < max_offset)
		{
			$('.year-nav-older').addClass('year-nav-disabled');
		}
		else
		{
			$('.year-nav-newer').removeClass('year-nav-disabled');
			$('.year-nav-older').removeClass('year-nav-disabled');
		}
	});

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
			var width_active   = window.innerWidth * 0.36;
			var width_inactive = window.innerWidth * 0.16;

			div
				.addClass('year-active')
				.css('width', width_active);

			$('.year:not(.year-active)')
				.addClass('year-inactive')
				.css('width', width_inactive);

			$('header').addClass('header-inactive');
			$('.year-nav').addClass('year-nav-inactive');

			fragment = fragment + year;

			$('.years').css('margin-left', 0 - (year_offset * width_inactive));
		}
		else
		{
			$('.year-nav').removeClass('year-nav-inactive');
			$('.year').css('width', width_original);
			$('.years').css('margin-left', margin_left);
		}

		if (window.innerWidth <= 1024)
		{
			location.href = fragment;
		}
	});
});
