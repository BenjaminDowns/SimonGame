(document).addEventListener('DOMContentLoaded', function() {
    'use strict'

    let r = document.getElementById('r')
    let g = document.getElementById('g')
    let y = document.getElementById('y')
    let b = document.getElementById('b')
    let container = document.getElementById('container');
    let controls = document.getElementById('controls')
    let togglePower = document.getElementById('toggle-switch')
    let messageDiv = document.getElementById('flashMessage')
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
        
        reset() {
            SIMON.moves = []        
        },
        
        flashMessage(message) {
            messageDiv.style.display = 'absolute'
            messageDiv.innerText = message
            
        }
    }

    const PLAYER = {
        moves: [],
        repeating: false,
        correctInput: () => PLAYER.moves.every((x, i) => x === SIMON.moves[i].id)
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

        if (SIMON.isSIMONturn) {
            console.log('AI turn')
        }
        else if (!SIMON.isSIMONturn) {
            console.log('players turn!')
            PLAYER.moves.push(e.target.id)
            if (!PLAYER.correctInput()) {
                SIMON.flashMessage(`Sorry, but that was incorrect. Your final score was${SIMON.moves.length}`)
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



})