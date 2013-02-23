---
layout: post
title:  Nonogram Demo in PyGTK
---

So a while back I had gotten 3-in-1 Sodoku Garden on my cell phone because I like Sodoku even though I’m not that great at it. I figured, 3 games for the price of 1, wicked cool. Turns out one of the 3 games would later steal my heart. It went by the name “Tenpenki” and I couldn’t find anything on the interwebs about it that didn’t include the game on my cell phone. I thought to myself, “self, this would be a great project to learn PyGTK and you’d be rewarded for your efforts with a version of Tenpenki for the computer”. And it was. Funny enough though, once I got into coding my version of the puzzle game, I did some further digging on the game and I came across the Wikipedia page that completely summed up the alleged “Tenpenki”. It was called a [Nonogram](http://en.wikipedia.org/wiki/Nonogram) and it went by many names, none of which included “Tenpenki”. At this point I figured, no reason to stop just my Nonogram project just because Simon Tatham’s Portable Puzzle Collection has one. And so I present to you my Nonogram Demo. It’s extremely hard due to the random puzzle generation with no regard for skill level. I also opted to use check boxes either checked or unchecked, this just adds to the confusion as you can’t mark off any cells are “definitely blank”. Expect a better version in the future.

	#!/usr/bin/env python

	# Nonogram Demo
	#
	# This script generates a 10x10 pseudo-randomly generated Nonogram puzzle
	# with hints.  This is my first app in GTK since I dabbled with it when
	# PHP-GTK was first released, and it's my first application in PyGTK since
	# I started dabbling with Python not to long ago.
	#
	# If you're wondering what a Nanogram is, go here:
	#	 http://en.wikipedia.org/wiki/Nonogram
	#
	# These types of puzzles are also known as Paint by Numbers, Picross, Pixel
	# Puzzles and the name that I discovered the game under, Tenpenki.
	#
	# @author Josh Sherman
	# @link   http://joshtronic.com

	import pygtk
	pygtk.require('2.0')
	import gtk
	import random

	player_on = 0

	class Nonogram:
		# Callback function that checks if the puzzle has been completed successfully
		def callback(self, widget, correct_cell_value, total_on):
			# TODO: I know globals are bad, but when returning from the callback had unexpected results (for another day!)
			global player_on

			player_cell_value = (0, 1)[widget.get_active()]

			if player_cell_value == correct_cell_value:
				# Increment the player total when they check a cell
				if player_cell_value == 1:
					player_on += 1
			else:
				# Decrement the player total when they uncheck a cell
				if correct_cell_value == 1 and player_cell_value == 0:
					player_on -= 1

			# Display a short message upon completion of the puzzle
			if player_on == total_on:
				dialog = gtk.MessageDialog(
					parent		 = self.window,
					flags		  = gtk.DIALOG_DESTROY_WITH_PARENT,
					type		   = gtk.MESSAGE_INFO,
					buttons		= gtk.BUTTONS_OK,
					message_format = "You have successfully completed the Nonogram\n\nThis demo will terminate when you click 'OK'\n\nCheers!\n"
				)

				dialog.set_title('Congratulations')
				dialog.connect('response', lambda dialog, response: gtk.main_quit())

				dialog.show()

			return player_on

		# Quits the program
		def delete_event(self, widget, event, data=None):
			gtk.main_quit()
			return False

		# Initial logic to draw all the GUI widgets
		def __init__(self, grid):

			total_on  = 0
			player_on = 0
			current_count	 = 0
			current_col_count = []
			current_row_count = []
			all_col_counts	= []
			all_row_counts	= []

			# Loops through all the cells in the grid
			for i in range(10):
				current_count = 0

				# Loops through all the cells in the row
				for j in grid[i]:

					# Increment the counts
					if j == 1:
						current_count += 1
						total_on	  += 1
					# Add the total to the list and reset
					else:
						if current_count != 0:
							current_row_count.append(current_count)

						current_count = 0

				# This catches the count if the last cell isn't 0
				if current_count != 0:
					current_row_count.append(current_count)

				all_row_counts.append(current_row_count)
				current_row_count = []
				current_count	 = 0

				# Loops through all the cells in the column
				for j in range(10):
					# Increment the counts
					if grid[j][i] == 1:
						current_count += 1
					# Add the total to the list and reset
					else:
						if current_count != 0:
							current_col_count.append(current_count)

						current_count = 0

				# This catches the count if the last cell isn't 0
				if current_count != 0:
					current_col_count.append(current_count)

				all_col_counts.append(current_col_count)
				current_col_count = []

			# Creates a new window
			self.window = gtk.Window(gtk.WINDOW_TOPLEVEL)

			# Sets the window title
			self.window.set_title("Nonogram Demo")

			# Sets a handler for delete_event that immediately exits GTK
			self.window.connect("delete_event", self.delete_event)

			# Sets the border width of the window
			self.window.set_border_width(0)

			# Adds our main layout box
			vbox = gtk.VBox(True, 0)
			self.window.add(vbox)

			# Determines how much padding is necessary on the column hints
			max_col_hints = 0
			for i in range(10):
				current_hints = len(all_col_counts[i])

				if current_hints > max_col_hints:
					max_col_hints = current_hints

			# Pads the column hint lists
			for i in range(10):
				padding = max_col_hints - len(all_col_counts[i])

				for j in range(padding):
					all_col_counts[i].insert(0, '')

			# Determines how much padding is necessary on the row hints
			max_row_hints = 0
			for i in range(10):
				current_hints = len(all_row_counts[i])

				if current_hints > max_row_hints:
					max_row_hints = current_hints

			# Pads the row hint lists
			for i in range(10):
				padding = max_row_hints - len(all_row_counts[i])

				for j in range(padding):
					all_row_counts[i].insert(0, '')

			# Generates the column hints
			for i in range(max_col_hints):
				hbox = gtk.HBox(True, 0)
				vbox.add(hbox)

				# Adds padding to offset the row hints
				for j in range(max_row_hints):
					label = gtk.Label('')
					label.show()
					hbox.add(label)

				# Adds the hints
				for j in range(10):
					label = gtk.Label(all_col_counts[j][i])
					label.show()
					hbox.add(label)

				hbox.show()

			# Generates the playing area (with row hints)
			for i in range(10):
				hbox = gtk.HBox(True, 0)
				vbox.add(hbox)

				# Adds the row hints
				for count in all_row_counts[i]:
					label = gtk.Label(count)
					label.show()
					hbox.add(label)

				# Generates the grid of checkboxes
				for j in range(10):
					button = gtk.CheckButton()
					button.connect('toggled', self.callback, grid[i][j], total_on)
					hbox.pack_start(button, True, True, 2)
					button.show()

				hbox.show()

			vbox.show()

			self.window.show()

	def main():
		gtk.main()
		return 0

	if __name__ == "__main__":

		# Generates the 10x10 grid and populates the values
		Nonogram([[random.randint(0, 1) for column in range(10)] for row in range(10)])
		main()
