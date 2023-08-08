import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mui/material";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  
  //get all blogs from api
  const getAllBlogs = async () => {
    try {
      //change
      const { data } = await axios.get("https://motionless-fox-life-jacket.cyclic.app/api/v1/blog/all-blogs");
      if (data?.success) {
        setBlogs(data?.blogs); // data&&data.success is same as data?.success
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>

    
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
    {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog?._id}
            isUser = {localStorage.getItem('userId') === blog?.user?._id} 
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </Grid>
    
    


      {/*agar blogs milte hai toh usko map krwa do yani display krwa do */}
      
    </div>
  );
};

export default Blogs;