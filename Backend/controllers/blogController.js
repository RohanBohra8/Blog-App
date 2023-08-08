//import blog model
const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

//GET ALL BLOGS
exports.getALLBlogsController = async(req,res) => {
    try{
        const blogs = await blogModel.find({}).populate('user'); //yha pe populate use kia becasue of Blogcard user detail access
        //if blogs is empty
        if(!blogs){
            return res.status(200).send({
                message:"No Blogs Found",
                success:false
            })
        }
        return res.status(200).send({
            BlogCount: blogs.length,
            message:"All BLog Lists",
            success:true,
            blogs
        });

    } catch(error) {
        console.log(error);
        return res.status(500).send({
            message:"Error while getting all blogs",
            success:false
        })
    }
}


//CREATE BLOG
exports.CreateBlogController = async(req,res) => {
    try{
        const {title, description, image, user} = req.body;
        
        //validation
        if(!title || !description || !image || !user) {
            return res.status(400).send({
                message: 'Please enter all details',
                success:false
            })
        }
        const existingUser = await userModel.findById(user)
        //validation of user
        if(!existingUser) {
            return res.status(404).send({
                message:"unable to find user",
                success:false
            })
        }
        
        const newBlog = new blogModel({title,description,image,user});

        //to maintain relation ship among user and blog
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session})
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        
        await newBlog.save();

        return res.status(201).send({
            message:"New Blog created",
            success:true,
            newBlog
        })
    }catch(error){
        return res.status(400).send({
            message:"Error while creating the blog",
            success:false,
            error
        })
    }
}

//UPDATE BLOG
exports.updateBlogController = async (req,res) => {
    try{
        const {id} = req.params;
        const {title, description, image} = req.body;
        // no need for validation , because the user might or might no provide details 
        const updatedBlog = await blogModel.findByIdAndUpdate(id,{...req.body}, {new:true});

        return res.status(200).send({
            message:"Blog Updated",
            success:true,
            updatedBlog
        });
    } catch(error){
        console.log(error);
        return res.status(400).send({
            message:'Error while updating a blog',
            success:false,
            error
        })
    }
}

//GET SINGLE BLOG
exports.getBlogByIdController = async(req,res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        //if blog no found
        if (!blog) {
          return res.status(404).send({
            success: false,
            message: "blog not found with this is",
          });
        }

        return res.status(200).send({
          success: true,
          message: "fetch single blog",
          blog,
        });

      } catch (error) {
        console.log(error); 
        return res.status(400).send({
          success: false,
          message: "Error while getting  a single blog",
          error,
        });
      }
}

//DELETE BLOG
exports.deleteBlogController= async(req,res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");   // .findOneAndDelete(req.params.id)
        //pull method used to remove from an array
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        
        return res.status(200).send({
          success: true,
          message: "Blog Deleted!",
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error While Deleteing Blog",
          error,
        });
      }
}


//USER BLOG CONTROLLER - GET ALL BOLGS OF A PARTICULAR USER
exports.userBlogController = async(req,res) => {
    try {
        //body se voh saare blogs liye jinki user id match hui + populate bhi kia 
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
    
        //if fetched userBlog is empty
        if (!userBlog) {
          return res.status(404).send({
            success: false,
            message: "blogs not found with this id",
          });
        }

        return res.status(200).send({
          success: true,
          message: "user blogs",
          userBlog,
        });

      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error in user blog",
          error,
        });
      }
}