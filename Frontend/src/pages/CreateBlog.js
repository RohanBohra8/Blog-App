import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem('userId');
  
  const navigate = useNavigate(); //jese hi user post create krega toh use myblogs me redirect kr lege 
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  //input change in title (handle title)
  const handleChange = (e) => {
    setInputs(prevState => ({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }


  //from handle submit function
  const handleSubmit = async(e) => {
    e.preventDefault();
    //ab hum ise post krege
    try{
      //change
        const {data} = await axios.post('https://motionless-fox-life-jacket.cyclic.app/api/v1/blog/create-blog',{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:id
        })

        if(data?.success){
            toast.success("blog created");
            navigate('/my-blogs');
        }
    }catch(error){
        console.log(error)
    }
  };

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
            Create A Post
          </Typography>
          <InputLabel sx={{mb:1,mt:1,fontSize:'24px',fontWeight:'bold'}}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined" required/>

          <InputLabel sx={{mb:1,mt:1,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} multiline={true} rows={4} margin="normal" variant="outlined" required />

          <InputLabel sx={{mb:1,mt:1,fontSize:'24px',fontWeight:'bold'}}>Image URL</InputLabel>
          <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant="outlined" required />

          <Button type="submit" color="primary" variant="contained" onClick={handleSubmit}>SUBMIT</Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
