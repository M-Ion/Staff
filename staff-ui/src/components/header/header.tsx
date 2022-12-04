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
import React from "react";
import {
  headerBtnSx,
  growSx,
  logoIconSx,
  logoTitleSx,
} from "../../assets/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/store/slices/user.slice";
import OnlyAuth from "../commons/onlyAuth";

const pages = ["Dashboard"];

type Props = {
  headerSx?: SxProps;
};

const Header = ({ headerSx }: Props) => {
  const currentUser = useSelector(selectUser);

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
            {pages.map((page) => (
              <Button key={page} sx={{ ...headerBtnSx }}>
                {page}
              </Button>
            ))}
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
