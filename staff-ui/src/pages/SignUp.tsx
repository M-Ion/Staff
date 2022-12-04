import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import Copyright from "../components/commons/copyright";
import { alignLeftSx, fullVHSx } from "../assets/styles";
import { authAvatarSx, authBgImgSx } from "./styles";
import SignUpForm from "../components/forms/signUp";
import Header from "../components/header";

const SignUpPage = () => {
  return (
    <>
      <Header />
      <Grid container component="main" sx={{ ...fullVHSx }}>
        <Grid item xs={false} sm={4} md={7} sx={{ ...authBgImgSx("signup") }} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={"flexColumn authContainer"}>
            <Avatar sx={{ ...authAvatarSx }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <SignUpForm />
            <Link
              component={RouteLink}
              to="/login"
              variant="body2"
              sx={{ ...alignLeftSx }}
            >
              Already have an account? Login
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

export default SignUpPage;
