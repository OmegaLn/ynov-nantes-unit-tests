const board = require('../src/minesweeper.js')


const bombs = []


function randomizeBombs(rows, difficulty) {
    for (let i = 0; i < difficulty; i++) {
        bombs.push(Array.from({length: 2}, () => Math.floor(Math.random() * rows )))
        console.log(bombs)
}
return bombs
}

randomizeBombs(4, 1)


const size = 4;
const difficulty = 1;


const boardExample = new  board.Board(size, size, randomizeBombs(size, difficulty));
const boardSpoiler = boardExample.getPoints();
console.log(boardSpoiler, "minesweeper")
console.log(boardExample)

module.exports = {
    boardExample: boardExample,
    boardSpoiler: boardSpoiler,
}