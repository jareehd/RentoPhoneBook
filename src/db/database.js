const mongoose = require('mongoose')

mongoose.connect(process.env.dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify:false
})