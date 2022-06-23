
const express = require('express');
const app = express()
const path = require('path')
const aws = require('./aws')

app.set('view engine', 'ejs');
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/', require('./route'))
app.listen(3000)

