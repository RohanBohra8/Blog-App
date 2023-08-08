const mongoose = require('mongoose')

//desgining schema for blog
const blogSchema = new mongoose.Schema({
    title:
    {
        type:String,
        required:[true,'You must enter a true']
    }, 
    description:
    {
        type:String,
        required:[true,'You must enter a description']
    },
    image:
    {
        type:String,
        required:[true,'You must enter image']
    },
    user:
    {
        type:mongoose.Types.ObjectId,
        ref:'User',
        require: [true,'User Id is required']
    }


},{timestamps:true}) //add timestamp to know when user entered its details 

//to use our blogSchema , we need to convert it tinot a model with the help of mongoose.model method
const blogModel = mongoose.model('blog',blogSchema); // we pass it into mongoose.model(modelName, schema)

module.exports = blogModel;