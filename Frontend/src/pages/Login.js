import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux"; //job login ho jay toh isLogin ko change krne ke liye 
import {authActions} from '../redux/store'

const Login = () => {
  const navigate = useNavigate(); //it redirects to some page/website without using href or Link,to
  const dispatch = useDispatch(); //isLogin ko access krne ke liye jisse hum use function use krpaye


  //normal state
  const [inputs, setInputs] = useState({
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
      //change
      const { data } = await axios.post("https://motionless-fox-life-jacket.cyclic.app/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem('userId',data?.user._id); //local storage me user ki id save karwali kyunki badme userBlog me us user ki saved id ke through saare blogs fetch krne me help hogi
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
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
          Login
        </Typography>
        <TextField
          placeholder="email"
          value={inputs.email}
          name="email" //must be same as that of object name in inputs state variable
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
          onClick={() => navigate("/register")}
          sx={{ borderRadius: 3, marginTop: 2 }}
        >
          Not a User ? Please Register
        </Button>
      </Box>
      </form>
    </>
  );
}

export default Login;