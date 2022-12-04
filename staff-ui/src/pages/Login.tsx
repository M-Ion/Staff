import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { alignLeftSx, fullVHSx } from "../assets/styles";
import { authAvatarSx, authBgImgSx } from "./styles";
import LoginForm from "../components/forms/login";
import Copyright from "../components/commons/copyright";
import Header from "../components/header";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <>
      <Header />
      <Grid container component="main" sx={{ ...fullVHSx }}>
        <Grid item xs={false} sm={4} md={7} sx={{ ...authBgImgSx("login") }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={"flexColumn authContainer"}>
            <Avatar sx={{ ...authAvatarSx }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <LoginForm />
            <Link
              component={RouteLink}
              to="/signup"
              variant="body2"
              sx={{ ...alignLeftSx }}
            >
              Don't have an account? Sign Up
            </Link>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
