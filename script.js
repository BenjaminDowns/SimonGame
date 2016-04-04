(document).addEventListener('DOMContentLoaded', function() {
    'use strict'

    let r = document.getElementById('r')
    let g = document.getElementById('g')
    let y = document.getElementById('y')
    let b = document.getElementById('b')
    let container = document.getElementById('container');
    let controls = document.getElementById('controls')
    let togglePower = document.getElementById('toggle-switch')
    let flashMessageDiv = document.getElementById('flashMessage')
    let controlButtons = document.getElementsByClassName('control-btn')
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');
    let overlayDiv = document.getElementById('overlay');

    const SIMON = {

        moves: [],
        pieces: [r, g, b, y],
        isSIMONturn: false,

        togglePower() {
            SIMON.reset()
            startButton.disabled = !startButton.disabled
            resetButton.disabled = !resetButton.disabled
        },

        addAMove() {
            PLAYER.moves = []
            let newPiece = this.pieces[Math.floor(Math.random() * 4)]
            this.moves.push(newPiece)
        },

        endGame: false,

        simulate() {
            SIMON.addAMove();
            for (let start = 0; start <= SIMON.moves.length - 1; start++) {
                setTimeout(() => {
                    SIMON.isSIMONturn = true;
                    // checks to makes sure that reset() was not called during middle of SIMON's turn before clicking
                    if (SIMON.moves[start]) {
                        SIMON.moves[start].click()
                    }
                }, start * 1000)
            }
        },

        reset: () => {
            SIMON.moves = []
            PLAYER.moves = []
        },

        flashMessage: (messages) => {
            let [message1, message2] = [messages[0], messages[1]]

            // flashes the first message every .75 seconds, for 3 seconds
            let flashing = setInterval(() => {
                flashMessageDiv.style.color = 'limegreen';
                flashMessageDiv.innerText = `${message1}`
                setTimeout(() => flashMessageDiv.innerText = '', 500)

            }, 750);
            // stops the first message after 1.5 seconds
            setTimeout(() => clearInterval(flashing), 1500)

            if (message2 !== undefined) {
                // wait 1.5 seconds, then flash the second message
                setTimeout(() => {

                    setTimeout(() => clearInterval(flashing2), 3000)
                    let flashing2 = setInterval(() => {

                        flashMessageDiv.innerText = `${message2}`
                        setTimeout(() => flashMessageDiv.innerText = '', 500)

                    }, 750);
                }, 1500);
            }
            setTimeout(() => {
                flashMessageDiv.style.color = 'rgba(0,0,0,0.58)'
                flashMessageDiv.innerText = '888888888'
            }, 4500);
        }
    }

    const PLAYER = {
        moves: [],

        repeating: false,

        correctInput: () => PLAYER.moves.every((x, i) => x === SIMON.moves[i].id),

        loses: (message) => {
            SIMON.flashMessage([`INCORRECT`, `SCORE: ${SIMON.moves.length}`])
            SIMON.endGame = true;
            return SIMON.reset();
        },

        wins: (message) => {
            SIMON.flashMessage(['YOU WIN!', 'SCORE: 20'])
        }
    }

    resetButton.addEventListener('click', SIMON.reset)
    togglePower.addEventListener('click', SIMON.togglePower)
    start.addEventListener('click', () => {
        SIMON.endGame = false;
        SIMON.flashMessage(['BEGIN!'])
        setTimeout(() => SIMON.simulate(), 3000)

    });

    // trigger lightup event on click
    r.addEventListener('click', lightUp)
    g.addEventListener('click', lightUp)
    y.addEventListener('click', lightUp)
    b.addEventListener('click', lightUp)

    function lightUp(e) {

        if (!SIMON.isSIMONturn) {
            PLAYER.moves.push(e.target.id)

            if (!PLAYER.correctInput()) {
                PLAYER.loses();
            }
        }

        let clickedItem = e.target
        let original = clickedItem.style.background
        clickedItem.style.background = 'lightgray'
        e.stopPropagation();

        setTimeout(function() {
            clickedItem.style.background = original
        }, 250)

        SIMON.isSIMONturn = false;

        if (PLAYER.moves.length === SIMON.moves.length && !SIMON.endGame) {
            setTimeout(() => SIMON.simulate(), 1500);
        }
    }
    // } // end lightup function

    // setInterval(() => {
    //     if (tracker == SIMON.moves.length && tracker > 0)
    //         console.log("PLAYER'S TURN")
    // }, 500)
    // fade out

    //// FADE FUNCTIONS BASED ON CHRIS BUTTERY'S SOLUTION //// 
    //// http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/ ////

    function fadeOut(e) {
        e.style.opacity = 1;

        (function fade() {
            if ((e.style.opacity -= .1) < 0) {
                e.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }

    function fadeIn(e) {
        e.style.opacity = 0;
        e.style.display = "block";

        (function fade() {
            var val = parseFloat(e.style.opacity);
            if (!((val += .1) > 1)) {
                e.style.opacity = val;
                requestAnimationFrame(fade);

            }
        })();
    }




})