import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId'); // this tep is after handleDelete in blogCard
  console.log(isLogin);

  //normal state
  const [value, setValue] = useState(0);

  //hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout function
  const handleLogout = () => {
    try{
      dispatch(authActions.logout());
      toast.success('logout successfully');
      navigate('/login');
      localStorage.clear();
    }catch(error){
      console.log(error);
    }
  }


  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "#003049", borderRadius: "0 0 10px 10px" }}
      >
        <Toolbar>
          <Typography variant="h4">Blog App</Typography>

          {/*agar log in nhi hai toh Blogs and my blog nhi dikhega*/}
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {
              isLogin && (<Button sx={{ margin: 1, color: "white" }}  onClick={handleLogout}>Logout</Button>)
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
