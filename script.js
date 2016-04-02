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
    let tracker = 0;

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

        simulate() {
            SIMON.addAMove();
            for (let start = 0; start <= SIMON.moves.length - 1; start++) {
                setTimeout(() => {
                    SIMON.isSIMONturn = true;
                    // in case reset() is called during middle of SIMON's turn
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

        flashMessage: (message) => {
            flashMessageDiv.innerHTML = `<h2>${message}<h2>`
            fadeIn(flashMessageDiv)
            setTimeout(() => {
                fadeOut(flashMessageDiv)
                fadeIn(container)
            }
                , 3000);
        }
    }

    const PLAYER = {
        moves: [],
        
        repeating: false,
        
        correctInput: () => PLAYER.moves.every((x, i) => x === SIMON.moves[i].id),
        
        loses: (message) =>  {
            SIMON.flashMessage(`Sorry, but that was incorrect. Your final score was ${SIMON.moves.length}`)
            fadeOut(container)
            return SIMON.reset();
        }
    }

    resetButton.addEventListener('click', SIMON.reset)
    togglePower.addEventListener('click', SIMON.togglePower)
    start.addEventListener('click', SIMON.simulate);

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

        // PLAYER.moves.push(e.target.id)
        // console.log(PLAYER.moves)
        // console.log(SIMON.moves)

        // console.log(PLAYER.moves[index] === SIMON.moves[index]['id'])

        let clickedItem = e.target
        let original = clickedItem.style.background
        clickedItem.style.background = 'lightgray'
        e.stopPropagation();
        setTimeout(function() {
            clickedItem.style.background = original
        }, 250)
        SIMON.isSIMONturn = false;
        if (PLAYER.moves.length === SIMON.moves.length) {
            setTimeout(() => SIMON.simulate(), 1000);
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