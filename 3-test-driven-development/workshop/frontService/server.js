"use strict";
const express = require('express')
const app = express()
const port = 3000

const boardExample = require('./model.js')
const minesweeper = require('./model.js')


app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.send(minesweeper.boardSpoiler)
})
app.get('/board', (req, res) => {
    res.send(boardExample)
})
app.get('/minesweeper', function(req, res){
  res.sendFile('./views/view.html', { root: __dirname })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})