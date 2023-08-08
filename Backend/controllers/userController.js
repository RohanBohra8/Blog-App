// this file will have code to do this - went a user make a request from our website, like what will happen is he registers, login , etc 

//import user model
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt'); 

//create user register user
exports.registerController = async (req,res) => {
    try{
        const{username,email,password} = req.body;
        //validation
        if(!username || !email || !password) {
            return res.status(400).send({
                message:"Please fill all details",
                success:false
            })
        }
        //check is user already exist or not 
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                message:"user already exist",
                success:false
            })
        }

        //hashing the password before saving the user
        const hashedPassword = await bcrypt.hash(password,10);

        //save new user
        const newUser = new userModel({ username , email , password:hashedPassword }); //yha pe directy .save bhi likh skte hai
        await newUser.save(); //inbuilt function to save user

        return res.status(201).send({
            message:"New user created",
            success:true,
            newUser
        })
    } catch(error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in Register callback",
            success:false,
            error
        })
    }
}


//get all users from userRoutes
exports.getALLUsers = async(req,res) =>{
    try{
        const Allusers = await userModel.find({});
        return res.status(200).send({
            userCount: Allusers.length,
            message:"all users data",
            success:true,
            Allusers
        })
    } catch(error){
        console.log(error);
        return res.status(500).send({
            message:"Error in get all users",
            success:false,
            error
        })
    }
}



//login
exports.loginController = async (req,res) => {
    try {
        const { email , password } = req.body; 

        //validation
        if(!email || !password) {
            return res.status(401).send({
                message:"please provide Email or Password",
                success:false
            })
        }
        //check if user has thier email registered or not 
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).send({
                message:"email not registered",
                success:false
            })
        }
        //check if entered password is correct not not
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                message:"Invalid username or password",
                success:false
            })
        }
    
        return res.status(200).send({
            message:"login successfully",
            success:true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in login",
            success:false,
            error
        })
    }
} 