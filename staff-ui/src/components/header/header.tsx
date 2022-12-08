import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import {
  headerBtnSx,
  growSx,
  logoIconSx,
  logoTitleSx,
} from "../../assets/styles";
import { Link } from "react-router-dom";
import { selectUser } from "../../services/store/slices/user.slice";
import { useSelector } from "react-redux";
import OnlyAuth from "../commons/onlyAuth";

type Props = {
  headerSx?: SxProps;
};

const Header = ({ headerSx }: Props) => {
  const currentUser = useSelector(selectUser);
  const [workspace, setWorkspace] = useState<string>("/login");

  useEffect(() => {
    if (currentUser) {
      if (
        currentUser.roles.find(
          (r) => r === (process.env.REACT_APP_MANAGER_ROLE as string)
        )
      ) {
        setWorkspace("/manager");
        return;
      } else if (
        currentUser.roles.find(
          (r) => r === (process.env.REACT_APP_WAITER_ROLE as string)
        )
      ) {
        setWorkspace("/waiter");
        return;
      }
    }
  }, [currentUser]);

  return (
    <AppBar position="static" sx={headerSx ? headerSx : {}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalCafeIcon sx={{ ...logoIconSx }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ ...logoTitleSx }}
          >
            STAFF
          </Typography>
          <Box sx={{ ...growSx }}>
            <Link to={workspace} style={{ textDecoration: "none" }}>
              <Button sx={{ ...headerBtnSx }}>Workspace</Button>
            </Link>
          </Box>
          <Box>
            <IconButton>
              <Avatar>
                {currentUser ? (
                  <>
                    <OnlyAuth roles={["Manager"]}>
                      <AdminPanelSettingsIcon />
                    </OnlyAuth>
                    <OnlyAuth roles={["Waiter"]}>
                      <AccountCircleIcon />
                    </OnlyAuth>
                  </>
                ) : (
                  <LoginIcon />
                )}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
