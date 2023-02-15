import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { flexColumnSx, fullVHSx, fullWidthWithNav } from "../assets/styles";
import Header from "../components/header";
import Navigation from "../components/navigation";
import { selectLang } from "../services/store/slices/localization.slice";
import langDict from "../utils/lang.utils";

type Props = {};

const ManagerPanelPage = (props: Props) => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const currentLang = useSelector(selectLang);

  return (
    <Box sx={{ ...flexColumnSx }}>
      <Header headerSx={{ ...fullWidthWithNav }} />
      <Navigation />
      <Box sx={{ ...fullWidthWithNav, ...fullVHSx }}>
        <Container sx={{ pt: 2, mx: 0 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="inherit">
              {currentLang === "RO" ? "Panoul Managerului" : "Manager Panel"}
            </Typography>
            <Typography
              color="text.primary"
              sx={{ textTransform: "capitalize" }}
            >
              {currentLang === "EN" ? currentPath : langDict.get(currentPath)}
            </Typography>
          </Breadcrumbs>
        </Container>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ManagerPanelPage;
