(document).addEventListener('DOMContentLoaded', function () {
    'use strict'
    const SIMON = {
        
        powerOn: false,
        
        togglePower() {
            this.powerOn = !this.powerOn
        },
        
        start() {
            alert('hello')
        }

    }

    let container = document.getElementById('container');
    let controls = document.getElementById('controls')
    let togglePower = document.getElementById('toggle-switch')
    togglePower.addEventListener('click', SIMON.togglePower)

    container.addEventListener('click', lightUp);

    function lightUp(e, v) {
        if (e.target === controls || e.target === togglePower) {
            e.stopPropagation();
            return null;
        }

        let clickedItem, original
        if (e.target !== e.currentTarget) {
            clickedItem = e.target
            original = clickedItem.style.background
            clickedItem.style.background = 'lightgray'
        }
        e.stopPropagation();
        lightDiv()
        setTimeout(function() {
            clickedItem.style.background = original
        }, 100)
    }

    let moves = []

    


})