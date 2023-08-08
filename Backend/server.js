const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');

//env config
dotenv.config()

//router import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//mongoose connection
connectDB()

//rest object creation 
const app = express()

//middlewares 
app.use(cors())
app.use(express.json()) //can recieve json data as awell from client/frontend
app.use(morgan('dev'))

//routes
app.use('/api/v1/user',userRoutes); // standard practice to use imported userRoutes
app.use('/api/v1/blog',blogRoutes);


/*
//routes
//no needed since we added userRutes in our file
app.get('/',(req,res)=> {
    res.status(200).send({
        "message":"Server Sent Successfully"
    })
}) 
*/



//PORT variable 
const PORT =  process.env.PORT || 3001

//listen
app.listen(PORT,()=> {
    console.log(`Server Running on ${process.env.DEV_MODE} mode: ${PORT}`.bgCyan.white) // "." ke aage ka part colors wale package ka hai
})

