import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useParams, useNavigate  } from 'react-router-dom';
import toast  from 'react-hot-toast';

const BlogDetails = () => {
    const [blog,setBlog] = useState({});
    const id= useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    //get blog details
    const getBlogDetail = async() => {
        try{
            const {data} = await axios.get(`/api/v1/blog/get-blog/${id}`)
            if(data?.success){
                setBlog(data?.blog); //blogController me jake dekho GET SINLGE BLOG me "blog"  return ho rha hai , so idhar bhi "blog" same spelling use kia
                setInputs({
                    title:data?.blog.title,
                    description: data?.blog.description,
                    image:data?.blog.image
                });
            }
        }catch(error) {
            console.log(error);
        }
    }

    useEffect(()=>{  
      getBlogDetail();
    },[id]); 

    
    //id ke base me useEffect run krega 
    
    //edit form ko change krne ke liye
    //so boht chize copy kri hai CreateBlog me se 
    
      //input change in title (handle title)
      const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
      }
    
    
      //from handle submit function
      const handleSubmit = async(e) => {
        e.preventDefault();
        //ab hum ise post krege
        try{
            const {data} = await axios.put(`/api/v1/blog/update-blog/${id}`,{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id,
            })
    
            if(data?.success){
                toast.success("blog updated");
                navigate('/my-blogs');
            }
        }catch(error){
            console.log(error)
        }
      };
      console.log(blog);


  return (
    <>
        <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={1}
            color="#003049"
          >
            Update your Post
          </Typography>
          <InputLabel sx={{mb:1,mt:1,fontSize:'24px',fontWeight:'bold'}}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" required/>

          <InputLabel sx={{mb:1,mt:1,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} multiline={true} rows={4} margin="normal" variant="outlined" required />

          <InputLabel sx={{mb:1,mt:1,fontSize:'24px',fontWeight:'bold'}}>Image URL</InputLabel>
          <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant="outlined" required />

          <Button type="submit" color="warning" variant="contained" onClick={handleSubmit}>Update</Button>
        </Box>
      </form>
    </>
  )
}

export default BlogDetails;

