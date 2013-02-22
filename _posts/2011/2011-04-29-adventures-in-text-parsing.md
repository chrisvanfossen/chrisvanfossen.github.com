---
layout: post
title:  "WorkFlowy: Adventures in Text Parsing"
---

First off, if you’re not familiar with WorkFlowy you may want to watch this video. WorkFlowy is quite simply a list maker and based on my own usage of planning out a program / script I decided to create a script to take an exported list and convert it into a the workings of the program itself.

The script that I wrote is in PHP and only generates PHP files. I lost interest in the project, at least in the capacity of adding support for additional languages, so I took it down from my github (oh yeah, and no one was interested in the project itself ;))

At best, you can use this to take a list like this:

	- My Script
	  - [IF] Check if file exists
	  - Reads the file in
	  - [FOREACH] Loops through the data
		- [IF] Check if the data is empty
		  - Processes the data
		- [ELSE]
		  - Does some other stuff
	  - Closes the file
	  - [WHILE] Just a while loop
		- Increment counter

And turn it into something like this:

	<?php

	/**
	 * My Script
	 */

	// Check if file exists
	if ($var == true)
	{
	}

	// Reads the file in

	// Loops through the data
	foreach ($array as $key => $value)
	{
		// Check if the data is empty
		if ($var == true)
		{
			// Processes the data
		}
		else
		{
			// Does some other stuff
		}
	}

	// Closes the file

	// Just a while loop
	while ($i < 10)
	{
		// Increment counter
	}

	?>

Assuming you’re into that, here’s the source:

	<!DOCTYPE html>
	<html>
		<body>
			<h1>WorkFlowy Code Generator</h1>
			<form action="" method="post">
				<textarea name="list" rows="20" cols="100"><?php
					if (isset($_POST['list']))
					{
						$items = explode("\n", $_POST['list']);

						if (count($items) > 0)
						{
							$indents		 = null;
							$previous_spaces = null;
							$parenthesis	 = 0;

							foreach ($items as $item)
							{
								preg_match('/^( +)?(- )(.+)$/', $item, $matches);

								$spaces = strlen($matches[1]);
								$item   = trim($matches[3]);

								$is_syntax = (strpos($item, '[') === 0);

								if ($item != '')
								{
									if ($indents === null)
									{
										$indents = 0;
										echo '<?php' . "\n\n";
										echo '/**' . "\n" . ' * ' . $item . "\n" . ' */' . "\n\n";
									}
									else
									{
										if ($previous_spaces !== null)
										{
											if ($previous_spaces > $spaces)
											{
												$difference = $previous_spaces - $spaces;

												for ($i = 0; $i < $difference; $i = $i + 2)
												{
													$indents--;

													if ($parenthesis > 0)
													{
														echo str_repeat("\t", $indents) . '}' . "\n\n";
														$parenthesis--;
													}
												}
											}
											elseif ($previous_spaces < $spaces)
											{
												$difference = $spaces - $previous_spaces;

												for ($i = 0; $i < $difference; $i = $i + 2)
												{
													$indents++;
												}
											}
											else
											{
												if ($parenthesis > 0)
												{
													echo $indent_string . '}' . "\n\n";
													$parenthesis--;
												}
											}
										}

										$indent_string = str_repeat("\t", $indents);

										if ($is_syntax)
										{
											preg_match('/^(\[.+\])(.+)?$/', $item, $matches);

											$type = substr($matches[1], 1, strlen($matches[1]) - 2);
											$item = trim($matches[2]);
										}
										else
										{
											$type = false;
										}

										if ($item != '')
										{
											echo $indent_string . '// ' . $item . "\n";
										}

										if ($type != false)
										{
											switch ($type)
											{
												case 'FOR':
													echo $indent_string . 'for ($i = 0; $i < 10; $i++)' . "\n" . $indent_string . '{';
													break;

												case 'FOREACH':
													echo $indent_string . 'foreach ($array as $key => $value)' . "\n" . $indent_string . '{';
													break;

												case 'IF':
													echo $indent_string . 'if ($var == true)' . "\n" . $indent_string . '{';
													break;

												case 'ELSEIF':
													echo $indent_string . 'elseif ($var == false)' . "\n" . $indent_string . '{';
													break;

												case 'ELSE':
													echo $indent_string . 'else' . "\n" . $indent_string . '{';
													break;

												case 'WHILE':
													echo $indent_string . 'while ($i < 10)' . "\n" . $indent_string . '{';
													break;
											}

											$parenthesis++;
										}

										echo "\n";

										$previous_spaces = $spaces;
									}
								}
							}

							if ($parenthesis > 0)
							{
								echo '}' . "\n\n";
							}

							echo '?>';
						}
					}
					?></textarea>

				<input type="submit" />
			</form>
		</body>
	</html>
