const express = require('express')
const app = express()
const port= 5000

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://JungHwan:4770@cluster0.oaklg9q.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!, asdfasdf'))

app.listen(port, () => console.log('Example app listening on port ${port}!'))