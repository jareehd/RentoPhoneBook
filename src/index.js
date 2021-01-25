const express = require('express')
const app = express()
require('dotenv').config()
const UserRoutes = require('./routers/userRoutes.js')
const ContactRoutes = require('./routers/contactRoutes.js')

require('./db/database')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.set('view engine' ,'ejs')

app.use(UserRoutes)
app.use(ContactRoutes)

app.get('/*',(req,res)=>{
    res.send('Error wrong page')
})

app.listen(port,() =>{
    console.log('Server is up on port ',port)
})