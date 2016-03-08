(document).addEventListener('DOMContentLoaded', function() {
    'use strict'

    let r = document.getElementById('r')
    let g = document.getElementById('g')
    let y = document.getElementById('y')
    let b = document.getElementById('b')
    let container = document.getElementById('container');
    let controls = document.getElementById('controls')
    let togglePower = document.getElementById('toggle-switch')
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');
    let tracker = 0;
    
    const SIMON = {

        moves: [],
        pieces: [r, g, b, y],
        counter: 1,
        powerOn: false,

        togglePower() {
            this.powerOn = !this.powerOn
            SIMON.reset()
            startButton.disabled = !startButton.disabled
            resetButton.disabled = !resetButton.disabled
        },
        addAMove() { 
            let newPiece = this.pieces[Math.floor(Math.random() * 4)]
            newPiece.setAttribute('AI', true)
            this.moves.push(newPiece)
        },
        wait() {
            console.log('waiting now');
        },
        simulate() {
            SIMON.addAMove();
            for (let start = 0; start <= SIMON.moves.length - 1; start++) {
                setTimeout(() => {
                    SIMON.moves[start].click()
                    tracker++
                }, start * 1000)
            }
        },
        reset() {
            SIMON.moves = []
        }
    }

    const PLAYER = {
        moves: [],
        repeating: false
    }

    function makeMoves() {


        // wait for player input
        // check each move against the SIMON.moves array
        // if move !== SIMON.moves[counter] then alert("sorry, you're an idiot")
        // show score? (counter + 1)
    }



    resetButton.addEventListener('click', SIMON.reset)
    togglePower.addEventListener('click', SIMON.togglePower)
    start.addEventListener('click', SIMON.simulate);
    // trigger lightup event on click
    r.addEventListener('click', lightUp)
    g.addEventListener('click', lightUp)
    y.addEventListener('click', lightUp)
    b.addEventListener('click', lightUp)
    let move = 0
    let counter = 1;
    function lightUp(e) {
        move++
        if (e.path[0].attributes.ai && e.path[0].attributes.ai.value !== 'undefined') {
            console.log('AI turn')
            counter++
            e.path[0].attributes.ai.value = undefined
        }
        
        if (counter % 2 === 0) {
            console.log('player turn')
            // PLAYER.moves.push(e.target.id)
            // console.log(PLAYER.moves)
            // console.log(SIMON.moves)
            
            // console.log(PLAYER.moves[index] === SIMON.moves[index]['id'])
        }
        
        let clickedItem = e.target
        let original = clickedItem.style.background
        clickedItem.style.background = 'lightgray'
        e.stopPropagation();
        setTimeout(function() {
            clickedItem.style.background = original
        }, 300)
        
    }
    // } // end lightup function

    // setInterval(() => {
    //     if (tracker == SIMON.moves.length && tracker > 0)
    //         console.log("PLAYER'S TURN")
    // }, 500)



})