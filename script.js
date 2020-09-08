'use strict'


let level = 0,
    music = [],
    diff = 0,
    inter = null;

const gameOptDiv = document.querySelectorAll('.game-option input'),
    btn1 = document.querySelector('.board-item-1'),
    btn2 = document.querySelector('.board-item-2'),
    btn3 = document.querySelector('.board-item-3'),
    btn4 = document.querySelector('.board-item-4'),
    btns = [btn1, btn2, btn3, btn4],
    lvlIndicator = document.querySelector('.level-indicator .level'),
    res = document.querySelector('.result');


const gameOver = () => {
    res.textContent = 'game over on level:' + level;
    clearInterval(inter);
    music = [];
    level = 0;
}

const releaseBtn = number => btns[number - 1].classList.remove('picked');

const playBtn = (number, userPlay = true) => {
    if (number === undefined || number > 4 || number < 1) return;
    new Audio('./sounds/' + number + '.mp3').play();
    btns[number - 1].classList.add('picked');
    setTimeout(() => releaseBtn(number), diff / 2);

    if (userPlay) {
        const cur = music.shift();
        if (cur != number) return gameOver();
        if (music.length === 0) return nextlevel();
    } else music.push(number);
}

const generateLevel = () => {
    let curCount = 0;
    inter = setInterval(() => {
        const btnNumber = 1 + Math.floor(Math.random() * 4);
        playBtn(btnNumber, false);
        curCount++;
        if (curCount === level) {
            clearInterval(inter);
            console.log(music);
        }
    }, diff);
}

const nextlevel = () => {
    level++;
    generateLevel();
    lvlIndicator.textContent = level;
}

const startgame = () => {
    level = 0;
    music = [];
    res.textContent = null;
    gameOptDiv.forEach(op => op.checked === true ? diff = op.value : null);
    nextlevel();
}

function debounce(fn, time) {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => { fn(...args) }, time - 1)
    }

}

const play = debounce(startgame, 500);

console.log('help for devs, misuc will be here');