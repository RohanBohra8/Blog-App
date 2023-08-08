const express = require('express');
const { getALLBlogsController, CreateBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');

//router object create
const router = express.Router()

//creating all routes

//GET ALL BLOGS || GET
router.get('/all-blogs', getALLBlogsController);

//CREATE BLOG || POST
router.post('/create-blog',CreateBlogController);

//UPDATE BLOG || PUT
router.put('/update-blog/:id',updateBlogController)

//GET SINGLE BLOG || GET
router.get('/get-blog/:id', getBlogByIdController);

//DELETE BLOG || DELETE
router.delete('/delete-blog/:id', deleteBlogController);

//GET ALL BLOGS OF A PARTICULAR USER || GET
router.get('/user-blog/:id', userBlogController);


module.exports = router;