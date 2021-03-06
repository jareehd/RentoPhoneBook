const express = require('express')
const app = express()
const cors = require("cors");
require('dotenv').config()
const path = require('path')
const UserRoutes = require('./routers/userRoutes.js')
const ContactRoutes = require('./routers/contactRoutes.js')

require('./db/database')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 5000

app.use(UserRoutes)
app.use(ContactRoutes)

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port,() =>{
    console.log('Server is up on port ',port)
})