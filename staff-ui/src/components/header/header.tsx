import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  headerBtnSx,
  growSx,
  logoIconSx,
  logoTitleSx,
} from "../../assets/styles";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, setInitial } from "../../services/store/slices/user.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import authService from "../../services/auth.service";
import DialogContainer from "../commons/dialogContainer";
import OnlyAuth from "../commons/onlyAuth";
import Profile from "../profile";

type Props = {
  headerSx?: SxProps;
};

const Header = ({ headerSx }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectUser);
  const [workspace, setWorkspace] = useState<string>("/login");
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const [logout] = authService.useLogoutMutation();

  const handleOpenProfile = () => setOpenProfile(true);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(setInitial());

    navigate("/login");
  };

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
      } else if (
        currentUser.roles.find((r) => r === "Barkeep" || r === "Cook")
      ) {
        setWorkspace("/orders");
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
            <OnlyAuth>
              <Link to={workspace} style={{ textDecoration: "none" }}>
                <Button sx={{ ...headerBtnSx }}>Workspace</Button>
              </Link>
            </OnlyAuth>
          </Box>
          <Box>
            <OnlyAuth>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar>
                  {currentUser ? (
                    <>
                      <OnlyAuth roles={["Manager"]}>
                        <AdminPanelSettingsIcon />
                      </OnlyAuth>
                      <OnlyAuth roles={["Waiter", "Barkeep", "Cook"]}>
                        <AccountCircleIcon />
                      </OnlyAuth>
                    </>
                  ) : (
                    <LoginIcon />
                  )}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleOpenProfile}>
                  <ListItemIcon>
                    <AssignmentIndIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </OnlyAuth>
          </Box>
        </Toolbar>
      </Container>
      <OnlyAuth>
        <DialogContainer openState={[openProfile, setOpenProfile]}>
          <Profile />
        </DialogContainer>
      </OnlyAuth>
    </AppBar>
  );
};

export default Header;
