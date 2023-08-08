const mongoose = require('mongoose')

//desgining schema for user
const userSchema = new mongoose.Schema({
    username:
    {
        type:String,
        required:[true,'You must enter a username']
    }, 
    email:
    {
        type:String,
        required:[true,'You must enter a email']
    },
    password:
    {
        type:String,
        required:[true,'You must enter a password']
    },
    blogs: 
    [
        {
            type:mongoose.Types.ObjectId,
            ref:'blog'
        }
    ]
},{timestamps:true}) //add timestamp to know when user entered its details 

//to use our userSchema , we need to convert it tinot a model with the help of mongoose.model method
const userModel = mongoose.model('User',userSchema); // we pass it into mongoose.model(modelName, schema)

module.exports = userModel;