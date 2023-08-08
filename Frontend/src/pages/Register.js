import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); //it redirects to some page/website without using href or Link,to

  //normal state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault(); // jab bhi form submit hiota hai toh page refresh hota hai , uske behaviour ko rokne ke liye
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display={"flex"}
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin={"auto"}
        marginTop={5}
        boxShadow="10px 10px 20px #003049"
        borderRadius={"20px 20px 20px 20px"}
        padding={3}
      >
        <Typography
          variant="h4"
          padding={3}
          textAlign={"center"}
          sx={{ textTransform: "uppercase" }}
          color={"#003049"}
        >
          Register
        </Typography>
        <TextField
          placeholder="name"
          value={inputs.name}
          name="name"   //must be same as that of object name in inputs state variable
          margin="normal"
          type="text"
          onChange={handleChange}
          required
        />
        <TextField
          placeholder="email"
          value={inputs.email}
          name="email"
          margin="normal"
          type="email"
          onChange={handleChange}

          required
        />
        <TextField
          placeholder="password"
          value={inputs.password}
          name="password"
          margin="normal"
          type="password"
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/login")}
          sx={{ borderRadius: 3, marginTop: 2 }}
        >
          Already Registered ? Please Login
        </Button>
      </Box>
      </form>
    </>
  );
};

export default Register;
