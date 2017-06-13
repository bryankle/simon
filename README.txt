Application created on February 23, 2017
README written on June 6, 2017

This applicaation was created as part of the FreeCodeCamp curriculum under the "Advanced Front End Development Projects" (https://www.freecodecamp.com/challenges/build-a-simon-game).

User story:

	- I am presented with a random series of button presses.
	- Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
	- I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
	- If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
	- I can see how many steps are in the current series of button presses.
	- If I want to restart, I can hit a button to do so, and the game will return to a single step.
	- I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

Notes: This project was quite different to what I had done prior. Up until this point, I haven't had to work with Javascript's built in timer functions (setInterval and setTimeout) yet, but after building this game, I can begin to understand the ideas behind asynchronous vs asynchronous Javascript. Also, I started to organize my code in what I perceived to be 'state'. Within the 'state' object, I encapsulated all of the conditions which would describe the current state of the game. This is especially illustrated in the beginning when the user selects strict or non-strict mode when beginning the game, which will trigger different conditions upon losing.