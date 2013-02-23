---
layout: post
title:  Super massive content update
---

Gutted just about every page on the site. There’s more of a focus on trim information without a lot of BS. No more links to friend’s sites and software and shit that didn’t really matter. Rewrote / updated the text on some pages to update their accuracy and revamp based on my own writing skills progressing. Oh, I also wrote this bitchin’ age calculator plugin for Smarty:

	<?php

	/**
	 * Smarty Age Calculator for PICKLES
	 *
	 * PICKLES is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU Lesser General Public License as
	 * published by the Free Software Foundation, either version 3 of
	 * the License, or (at your option) any later version.
	 *
	 * PICKLES is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU Lesser General Public License for more details.
	 *
	 * You should have received a copy of the GNU Lesser General Public
	 * License along with PICKLES.  If not, see
	 * <http://www.gnu.org/licenses/>.
	 *
	 * @author	Joshua John Sherman <josh@phpwithpickles.org>
	 * @copyright Copyright 2009 Joshua John Sherman
	 * @link	  http://phpwithpickles.org
	 * @license   http://www.gnu.org/copyleft/lesser.html
	 * @package   PICKLES
	 */

	/**
	 * Smarty Function: age
	 *
	 * Pass it a date, it spits back an age.
	 *
	 * @param  array Parameters array
	 * @param  object Smarty object
	 * @return integer calculated age
	 * @usage  <code>{age dob="1981-02-23"}</code>
	 */
	function smarty_function_age($params, &$smarty)
	{
		// Checks for our parameter
		if (empty($params['dob']))
		{
			$smarty->trigger_error('assign: missing \'dob\' parameter');
		}
		else
		{
			// Breaks the date apart
			list($dob_year, $dob_month, $dob_day) = split('-', $params['dob'], 3);

			// Determines the age regardless of the day
			$age = date('Y') - $dob_year;

			// If today's month day is less than the DOB then decrement
			if (date('md') < $dob_month . $dob_day)
			{
				$age--;
			}

			// Returns the age
			return $age;
		}
	}

	?>
