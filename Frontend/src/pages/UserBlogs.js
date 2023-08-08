//to display blogs related to a particular user..... inshort my blogs section
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mui/material";

const UserBlogs = () => {
  //state
  const [blogs, setBlogs] = useState([]);

  //get user blog using fucntion from BlogController
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      //agar data milega toh usko use state se set krdo
      if (data?.success) {
        setBlogs(data?.userBlog.blogs); //blogs controller me jake dekho ... UserBlog is the name of blogs of a particular user
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <Grid container spacing={1} columns={{xs: 1, sm: 2, md: 3}}>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser = {true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))) : (
        <h1>You haven't created a blog yet</h1>
        )}
    </Grid>
  );
};

export default UserBlogs;
