// import data from "./public/data.json"
const express = require('express')
const app = express()
const port = 5001
const request = require("request");
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})