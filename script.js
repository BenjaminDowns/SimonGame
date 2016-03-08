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

    const SIMON = {

        moves: [r, b, y],
        pieces: [r, g, b, y],
        counter: 1,
        powerOn: false,

        togglePower() {
            this.powerOn = !this.powerOn
        },
        addAMove() {
            moves.push(pieces[Math.floor(Math.random() * 4)])
        },
        simulate() {
            for (let start = 0; start <= SIMON.moves.length - 1; start++) {
                setInterval(() => {
                    SIMON.moves[start].click()
                }, start + 1 * 1000)
            }
        }

    }

    togglePower.addEventListener('click', SIMON.togglePower)
    start.addEventListener('click', SIMON.simulate);
    // trigger lightup event on click
    r.addEventListener('click', lightUp)
    g.addEventListener('click', lightUp)
    y.addEventListener('click', lightUp)
    b.addEventListener('click', lightUp)


    function lightUp(e, move) {
        console.log(e)
        console.log('and')
        console.log(move)
        if (e !== null) {
            // console.log(e)
            if (e.target === controls || e.target === togglePower) {
                e.stopPropagation();
                return null;
            }

            let clickedItem = e.target
            let original = clickedItem.style.background
            clickedItem.style.background = 'lightgray'
            e.stopPropagation();
            setTimeout(function() {
                clickedItem.style.background = original
            }, 100)
        }

        if (move !== undefined) {
            console.log('found a move')
            lightUp(move)
        }
    } // end lightup function

})