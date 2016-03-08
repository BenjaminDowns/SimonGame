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
            this.moves.push(this.pieces[Math.floor(Math.random() * 4)])
            console.log(this.moves)
        },
        wait() {
            console.log('waiting now');
        },
        simulate() {
            SIMON.addAMove();
            for (let start = 0; start <= SIMON.moves.length - 1; start++) {
                setTimeout(() => {
                    SIMON.moves[start].click({ AI: true })
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
    
    let turn = 0
    let index = 0
    let counter = 1;
    function lightUp(e) {
        turn++
        counter *= turn
        console.log(index)
        if (counter % 2 === 0) {
            PLAYER.moves.push(e.target.id)
            console.log(PLAYER.moves)
            console.log(SIMON.moves)
            
            console.log(PLAYER.moves[index] === SIMON.moves[index]['id'])
        }
        index++
        // if (e !== null) {
        //     if (e.target === controls || e.target === togglePower) {
        //         e.stopPropagation();
        //         return null;
        //     }

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
    //     if (PLAYER.moves.length === SIMON.moves.length)
    //         SIMON.simulate();
    // }, 500)



})