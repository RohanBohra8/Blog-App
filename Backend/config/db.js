const mongoose = require('mongoose')
const colors = require('colors')


//function to create a connection 
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongo DataBase : ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`MONGO DB CONNECTION ERROR : ${error}`.bgRed.white)
    }
}

//export mongoose
module.exports = connectDB;