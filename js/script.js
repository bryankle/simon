
var panels = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue'),
}
var turn = 0;

var state = {
    score: parseInt(document.getElementById('score').firstChild.nodeValue), // Not currently in use
    start: false, // Initiates after device is set to 'on'
    strict: false, // Toggles from strict to non-strict mode
    on: false, // Toggles on/true and off/false with start button
    array: [], // History of selected panels, used when Simon repeats
    playerArray:[], // Array containing players latest moves each turn; resets each turn 
    player: true, // Indicates if this is the players turn if true; Simon's turn if false
    correct: true, // Not currently in use
    playerMove: 0, // No major use at the moment; remove later
    repeat: false, // If a repeat is scheduled after non-strict failure
    playerRedo: false // Related to state.repeat; neccessary to accurately reflect feedback after failure; see var turn 

}

var getState = {
    start: document.getElementById('start'),
    strict: document.getElementById('strict'),
    on: document.getElementById('on'),
}

var disable = document.getElementById('disable');



// Attach event listener to center console buttons in control panel 
for (prop in getState) {
    getState[prop].addEventListener('click', adjustControlPanel) 
}

// Constantly updates 'Count' indicator no Simon
function updateScore() {
    var newScore = state.array.length;
    document.getElementById('score').firstChild.nodeValue = newScore;   
}
updateScore();

// Functionality of control panel buttons when initiated
function adjustControlPanel() {
    if (this == getState.start) {
        state.start = !state.start;
        if (state.start == true && state.on == true) {
            // Remove event listener on start button to prevent constant initiation
            getState.start.removeEventListener('click', adjustControlPanel);
            start();
        }
    }
    else if (this == getState.strict) {
        state.strict ? a = 'Strict Deactivated' : a = 'Strict Activated'
        console.log(a)
        state.strict = !state.strict;
        
    }
    else if (this == getState.on) {
        state.on = !state.on;
        console.log(state.on)
    }
}

var clickTimer;
// Generate a random panel to illuminate
function randomPanel() {
    var prob = Math.floor((Math.random() * 4) + 1);
    var element;
    console.log('Random Panel initiated')
    if (prob == 1) {
        element = $('.green-panel')
    }
    else if (prob == 2) {
        element = $('.red-panel')
    }
    else if (prob == 3) {
        element = $('.yellow-panel')
    }
    else if (prob == 4) {
        element = $('.blue-panel')
    }
    var getColor = element[0].getAttribute('id');
    state.array.push(getColor);
    lightUp(element, getColor);
    // Initiate timer to track player first turn
    // Reset timer
    clearTimeout(clickTimer);
        clickTimer = setTimeout(function(){
           if (state.strict == false) {
                nonStrictFail();
           }
            else if (state.strict == true){
                strictFail();
            }

        }, 5000)
}
// Random panel only executes once per loop

// Input color and output jQuery DOM reference to color panel
function colorToElement(c) {
    if (c == 'red') {
        element = $('.red-panel');
    }
    else if (c == 'green') {
        element = $('.green-panel');
    }
    else if (c == 'yellow') {
        element = $('.yellow-panel');
    }
    else if (c == 'blue') {
        element = $('.blue-panel');
    }
    return element;
}

// Initated after shifting console on and clicking start; see line 39
function start() {
    console.log('Start initiated')
    setTimeout(randomPanel, 1000);
    setTimeout(runGame, 2000)
}

// Primary driver for game; self inferring recursion in later functions
function runGame() {
    // Player's turn
    if (state.player == true) {
        state.player = !state.player;
        console.log('Player status: ' + state.player)
        console.log('Repeat: ' + state.repeat)
        updateScore(); // Updates score
        runPlayer();
    }
    // Simon's turn
    else {
        console.log('Player status: ' + state.player)
        state.player = !state.player;
        runSimon();
    }
}
// Pushing players moves into seperate array
function runPlayer() {
    for (prop in panels) {
        panels[prop].addEventListener('click', panelListen);
    }
    
}
// Set to 0 and increases incrementally by 1 each turn player makes to match history
// Resets at 0 after player successfully matches turns with history
    function panelListen() {
        // Timer to start inbetween turns
        console.log('Timer started')
        
        clearTimeout(clickTimer);
        /*
        clickTimer = setTimeout(function(){
            alert('hello');
            console.log('173')
        }, 5000)
        */
        console.log("Clicked");
        // Pushes player selected color into array to be compared to main array
        state.playerArray.push(this.getAttribute('id'));
        console.log('state.playerMove: ' + state.playerMove)
        // NON-STRICT APPLICATION
        // Applicable for when user successfully completes a turn but fails the next and Simon follows up to repeat on non-strict mode
        // Allows for proper color matching when player repeats move 
        if (state.playerRedo == true && state.strict == false) {
            state.playerRedo = false;
            turn = 0;
        }
        else if (state.playerRedo == false && state.strict == true) {
            turn = 0;
        }
        // Perform action here after player clicks on panel
        console.log('turn: ' + turn)
        console.log('Player choice: ' + state.playerArray[turn])
        console.log('Matched to: ' + state.array[turn])

        // IF PLAYER MAKES WRONG MOVE
        if (state.playerArray[turn] !== state.array[turn]) {
            turn = 0;
            // Create 2 options
            // If mode  NON-STRICT is active and player loses, replay latest
            if (state.strict == false) {                
                state.repeat = true;
                state.playerArray = [];
                runSimon();
            }
            // If mode STRICT is active and player loses; reset all
            else if (state.strict == true) {
                state.array = []; // History of selected panels, used when Simon repeats
                state.playerArray =[]; // Array containing players latest moves each turn; resets each turn 
                state.player = true; // Indicates if this is the players turn if true; Simon's turn if false
                state.correct = true; // Not currently in use
                state.playerMove = 0; // No major use at the moment; remove later
                state.repeat = false; // If a repeat is scheduled after non-strict failure
                state.playerRedo = false; // Rel

                setTimeout(randomPanel, 2000);
            }
        }
        turn++;
        // Executes after player turn is over
        if (state.playerArray.length == state.array.length) {
            turn = 0;
            console.log('Frozen')
            state.playerMove++; // Sync to HTML counter
            state.playerArray = [];
            for (prop in panels) {
                panels[prop].removeEventListener('click', panelListen)
            }
            runGame();
        }
    }

// Illuminate specific color panel
function lightUp(element, color) {
    element.toggleClass('illuminate')
    setTimeout(function(){element.toggleClass('illuminate')}, 500);
    if (color == 'green') {
        play1();
    }
    else if (color == 'red') {
        play2();
    }
    else if (color == 'yellow') {
        play3();
    }
    else if (color == 'blue') {
        play4();
    }
}
// Recites pattern until end of array
function runSimon(color) {

    clearTimeout(clickTimer); // Resets fail timer; DELETE

    var i = 0;
    // Prevents user input when Simon is running
    for (prop in panels) {
        panels[prop].removeEventListener('click', panelListen)
    }

    // Custom loop with time interval
    var step = setInterval(function() {
        console.log('Step function initiated')
        console.log(i);
        lightUp(colorToElement(state.array[i]), state.array[i])
        i++;
        //
        if (i > state.array.length - 1) {
            clearInterval(step);
            // If this iteration is new and not a repeat from a non-strict failure
            if (state.repeat == false) {
                setTimeout(randomPanel, 2000);
                setTimeout(runGame, 3000); // FIX TIME
            }
            // If this iteration is repeated due to non-strict failure
            else if (state.repeat == true) {
               // state.repeat = false;
                state.player = true;
                // Used to offset clearTimeout in thisfunction in line 251; enables constant failure in non-strict mode in turn 1
                clickTimer = setTimeout(function(){
                    if (state.strict == false) {
                        nonStrictFail();
                    }
                }, 5000)
                setTimeout(runGame, 3000); // FIX TIME
                state.repeat = false;
                state.playerRedo = true;
            }
        }
    }, 1000);
} 
// Simon repeats pattern when player loses in non-strict mode
function nonStrictFail() {
   // alert('Strict is off')
    state.repeat = true;
    state.playerArray = [];
    runSimon();
}
// Complete reset when player loses in strict mode
function strictFail() {
   // alert('Strict is ON - timeout')
    //document.getElementById('score').firstChild.nodeValue = 0;
    state.array = []; // History of selected panels, used when Simon repeats
    state.playerArray =[]; // Array containing players latest moves each turn; resets each turn 
    state.player = false; // Indicates if this is the players turn if true; Simon's turn if false
    state.correct = true; // Not currently in use
    state.playerMove = 0; // No major use at the moment; remove later
    state.repeat = false; // If a repeat is scheduled after non-strict failure
    state.playerRedo = false; // Rel
    setTimeout(randomPanel, 2000);
}

// Audio for each button
function play1() {
    var audio = document.getElementById('audio1');
    audio.play();
}
function play2() {
    var audio = document.getElementById('audio2');
    audio.play();
}
function play3() {
    var audio = document.getElementById('audio3');
    audio.play();
}
function play4() {
    var audio = document.getElementById('audio4');
    audio.play();
}