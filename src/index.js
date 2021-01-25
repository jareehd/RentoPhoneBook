const express = require('express')
const app = express()
require('dotenv').config()
const UserRoutes = require('./routers/userRoutes.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use(UserRoutes)
app.set('view engine' ,'ejs')

app.get('/*',(req,res)=>{
    res.send('Error wrong page')
})

app.listen(port,() =>{
    console.log('Server is up on port ',port)
})