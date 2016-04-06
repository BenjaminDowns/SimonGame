// Vanilla JS (no jQuery)

(document).addEventListener('DOMContentLoaded', function() {
  'use strict'

  // SOUNDS 
  const rSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
  const gSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
  const ySound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
  const bSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')

  // DOM ELEMENTS
  const r = document.getElementById('r')
  const g = document.getElementById('g')
  const y = document.getElementById('y')
  const b = document.getElementById('b')
  const container = document.getElementById('container');
  const controls = document.getElementById('controls')
  const togglePower = document.getElementById('toggle-switch')
  const flashMessageDiv = document.getElementById('flashMessage')
  const controlButtons = document.getElementsByClassName('control-btn')
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');
  const strictButton = document.getElementById('strict');
  const overlayDiv = document.getElementById('overlay');

  // trigger lightup event on click;
  r.addEventListener('click', lightUp)
  g.addEventListener('click', lightUp)
  y.addEventListener('click', lightUp)
  b.addEventListener('click', lightUp)

  const SIMON = {

    moves: [],
    pieces: [r, g, b, y],
    isSIMONturn: false,

    togglePower() {
      SIMON.moves = []
      PLAYER.moves = []
      startButton.disabled = !startButton.disabled
      resetButton.disabled = !resetButton.disabled
      strictButton.disabled = !strictButton.disabled
      SIMON.endGame = false;
    },
    
    toggleStrict() {
      SIMON.strict = !SIMON.strict;
      strictButton.className = strictButton.className.indexOf('-on') > -1 ? 'control-btn strict-off' : 'control-btn strict-on'  
    },

    addAMove() {
      let newPiece = this.pieces[Math.floor(Math.random() * 4)]
      this.moves.push(newPiece)
    },

    endGame: false,
    
    repeating: false,

    strict: false,
    
    simulate() {
      if (!SIMON.repeating) {
        this.addAMove();
      }
      PLAYER.moves = []
      SIMON.repeating = false
      flashMessageDiv.innerText = `STEPS: ${this.moves.length}`
      for (let start = 0; start <= SIMON.moves.length - 1; start++) {
        setTimeout(() => {
          this.isSIMONturn = true;
          // checks to makes sure that reset() was not called during middle of SIMON's turn
          if (this.moves[start]) {
            this.moves[start].click()
          }
        }, start * 1000)
      }
    },

    reset: () => {
      let finalScore = PLAYER.moves.length
      SIMON.moves = []
      PLAYER.moves = []
      SIMON.flashMessage(['RESET', `SCORE: ${finalScore}`])
    },

    flashMessage: (messages) => {
      let [message1, message2] = [messages[0], messages[1]]
      let messageInterval = 1500
      // flashes the first message every .75 seconds, for 1.5 seconds
     
      let flashing = setInterval(() => {
        flashMessage.style.color = /INCORRECT/.test(message1) ? '#f44336' : '#15BF3B'
        flashMessageDiv.innerText = message1
        setTimeout(() => flashMessageDiv.innerText = '', 500)

      }, 750);
      // stops the first message after 1.5 seconds
      setTimeout(() => clearInterval(flashing), messageInterval)
      
      // if end of game (which is determined by strict mode; flash 'game over')
      if (SIMON.endGame) {
          setTimeout(() => {

          let flashGameOver = setInterval(() => {
          
            flashMessage.style.color = '#f44336'
            flashMessageDiv.innerText = 'GAME OVER'
            setTimeout(() => flashMessageDiv.innerText = '', 500)
          }, 750);
          setTimeout(() => clearInterval(flashGameOver), messageInterval)
        }, messageInterval);
      
    }

      if (message2 !== undefined) {
        // wait either 1.5 or 3 seconds, then flash the second message
        messageInterval *= SIMON.endGame ? 2 : 1
        setTimeout(() => {

          let flashing2 = setInterval(() => {
            flashMessage.style.color = '#15BF3B'
            flashMessageDiv.innerText = message2
            setTimeout(() => flashMessageDiv.innerText = '', 500)

          }, 750);
          setTimeout(() => clearInterval(flashing2), messageInterval)
        }, messageInterval);

      }
    }
  }

  const PLAYER = {
    moves: [],

    correctInput: () => PLAYER.moves.every((x, i) => x === SIMON.moves[i].id),

    loses: (message) => {    

      // all four sounds at once to indicate error
      rSound.play()
      bSound.play()
      gSound.play()
      bSound.play()

      if (SIMON.strict) {
        SIMON.endGame = true
        SIMON.flashMessage([`INCORRECT`, 'SCORE: ' + SIMON.moves.length])
        SIMON.moves = []
        PLAYER.moves = []
      } else {
        SIMON.repeating = true
        SIMON.flashMessage(['INCORRECT', 'TRY AGAIN'])
        setTimeout(() => SIMON.simulate(), 5500)
      }

    },

    wins: (message) => {
      SIMON.flashMessage(['YOU WIN!', 'SCORE: 20'])
    }
  }

  function lightUp(e) {
      
    let clickedItem = e.target
    
    // helper function to lighten the clicked item's color
    let computeLightUpColor = () => {

      let rColor = originalRGB[0].replace('rgb(', '')
      let gColor = originalRGB[1].replace(' ', '')
      let bColor = originalRGB[2].replace(')', '')

      rColor = +rColor + 50 > 255 ? 255 : +rColor + 50
      gColor = +gColor + 50 > 255 ? 255 : +gColor + 50
      bColor = +bColor + 50 > 255 ? 255 : +bColor + 50
      let newRGB = `rgb(${rColor}, ${gColor}, ${bColor})`
      return newRGB
    }

    if (!SIMON.isSIMONturn) {
      PLAYER.moves.push(e.target.id)

      if (!PLAYER.correctInput()) {
        PLAYER.moves = []
        PLAYER.loses();
        
      }
    }

    let originalRGB = window.getComputedStyle(clickedItem, null).getPropertyValue("background-color").split(',')
    clickedItem.style.background = computeLightUpColor(originalRGB)
    let currentSound = eval(`${e.target.id}Sound`)
    currentSound.play()

    setTimeout(function() {
      clickedItem.style.background = originalRGB
    }, 250)

    SIMON.isSIMONturn = false;

    if (PLAYER.moves.length === SIMON.moves.length && !SIMON.endGame) {
      setTimeout(() => SIMON.simulate(), 1500);
    }
  }
  // end lightup function

  // EVENT LISTENERS FOR THE BUTTONS
  resetButton.addEventListener('click', SIMON.reset)
  start.addEventListener('click', () => {
    SIMON.endGame = false;
    SIMON.flashMessage(['BEGIN!'])
    setTimeout(() => SIMON.simulate(), 3000)
  });
  togglePower.addEventListener('click', SIMON.togglePower)
  strictButton.addEventListener('click', SIMON.toggleStrict)

})