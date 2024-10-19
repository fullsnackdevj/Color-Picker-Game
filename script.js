'use strict';
const startRoll = document.querySelector('.btnStartRoll');
const stopRoll = document.querySelector('.btnStopRoll');
const changeColor = document.querySelector('.btnChangeColor');
const lockButton = document.querySelector('.btnLockColor');
const playAgainButton = document.querySelector('.btnPlayAgain');
const overlay = document.querySelector('.overlay');

const displayColor = document.querySelector('.displayColor');

const gameStatus = document.querySelector('.status');

// selecting player color functionality
const selectedColor1 = document.querySelector('.color1');
const selectedColor2 = document.querySelector('.color2');
const selectedColor3 = document.querySelector('.color3');
const selectedColor4 = document.querySelector('.color4');
const selectedColor5 = document.querySelector('.color5');
const selectedColor6 = document.querySelector('.color6');

const muteColors = function () {
  gameStatus.textContent = 'LOCK OR CHANGE YOUR COLOR';
  selectedColor1.classList.add('muted');
  selectedColor2.classList.add('muted');
  selectedColor3.classList.add('muted');
  selectedColor4.classList.add('muted');
  selectedColor5.classList.add('muted');
  selectedColor6.classList.add('muted');
};

const unMuteColors = function () {
  gameStatus.textContent = 'PLEASE SELECT A COLOR';
  selectedColor1.classList.remove('muted');
  selectedColor2.classList.remove('muted');
  selectedColor3.classList.remove('muted');
  selectedColor4.classList.remove('muted');
  selectedColor5.classList.remove('muted');
  selectedColor6.classList.remove('muted');
};

let randomColorNumber, lockedColor, intervalId;

// player win functionality

selectedColor1.addEventListener('click', function () {
  lockedColor = 1;
  muteColors();
});

selectedColor2.addEventListener('click', function () {
  lockedColor = 2;
  muteColors();
});

selectedColor3.addEventListener('click', function () {
  lockedColor = 3;
  muteColors();
});

selectedColor4.addEventListener('click', function () {
  lockedColor = 4;
  muteColors();
});

selectedColor5.addEventListener('click', function () {
  lockedColor = 5;
  muteColors();
});

selectedColor6.addEventListener('click', function () {
  lockedColor = 6;
  muteColors();
});

// Select all radio inputs

const radios = document.querySelectorAll('input[type="radio"]');

// Add event listener to each radio button
radios.forEach(radio => {
  radio.addEventListener('click', function () {
    // show all buttons

    // changeColor.classList.remove('hideBtn');
    // lockButton.classList.remove('hideBtn');

    changeColor.disabled = false;
    lockButton.disabled = false;

    // Disable all other radio buttons
    radios.forEach(otherRadio => {
      if (otherRadio !== radio) {
        otherRadio.disabled = true; // Disable the other radio buttons
      }
    });
  });
});

//resetting or change color

changeColor.addEventListener('click', function () {
  changeColor.disabled = true;
  lockButton.disabled = true;

  radios.forEach(radio => {
    radio.disabled = false; // Re-enable all radio buttons
    radio.checked = false; // Uncheck all radio buttons
    unMuteColors();
    lockedColor = 0;
  });
});

const startColorRoll = function () {
  startRoll.classList.add('hideBtn');
  randomColorNumber = Math.trunc(Math.random() * 6) + 1;
  displayColor.src = `color-${randomColorNumber}.png`;
};

const stopColorRoll = function () {
  clearInterval(intervalId); // Stop the interval

  if (lockedColor === randomColorNumber) {
    gameStatus.textContent = 'Colors Matched! You Win! 🏆';
    playAgainButton.disabled = false;
  } else {
    gameStatus.textContent = 'Sorry, You Lose! 💥';
    playAgainButton.disabled = false;
  }
};

// random colors functionality
startRoll.addEventListener('click', function () {
  gameStatus.textContent = 'COLORS ARE ROLLING NOW...';
  startRoll.disabled = true;
  // Start rolling colors every 1000ms (1 second)
  intervalId = setInterval(startColorRoll, 100);

  // Automatically stop after 3 seconds
  setTimeout(function () {
    stopColorRoll();
  }, 5000);
});

changeColor.addEventListener('click', function () {
  changeColor.disabled = true;
  lockButton.disabled = true;
});

lockButton.addEventListener('click', function () {
  gameStatus.textContent = 'COLOR LOCKED!';
  startRoll.disabled = false;
  changeColor.disabled = true;
  changeColor.disabled = true;
  lockButton.disabled = true;
});

playAgainButton.addEventListener('click', function () {
  // unmute all the colors

  radios.forEach(radio => {
    radio.disabled = false; // Re-enable all radio buttons
    radio.checked = false; // Uncheck all radio buttons
    unMuteColors();
    lockedColor = 0;
  });

  playAgainButton.disabled = true;
  startRoll.disabled = true;
  changeColor.disabled = true;
  changeColor.disabled = true;
  lockButton.disabled = true;
  gameStatus.textContent = 'PLEASE SELECT A COLOR';
});
