import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { ReactNode } from "react";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import CategoryIcon from "@mui/icons-material/Category";
import { navSx } from "../../assets/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLang } from "../../services/store/slices/localization.slice";
import langDict from "../../utils/lang.utils";

type Props = {
  children?: ReactNode | ReactNode[];
};

const navItems = [
  { title: "Statistics", icon: <QueryStatsIcon /> },
  { title: "Workers", icon: <Diversity3Icon /> },
  { title: "Menu", icon: <RamenDiningIcon /> },
  { title: "Categories", icon: <CategoryIcon /> },
];

const Navigation = ({ children }: Props) => {
  const currentLang = useSelector(selectLang);

  return (
    <Drawer
      variant="permanent"
      sx={{
        ...navSx,
      }}
      open={true}
    >
      <Toolbar />
      <Divider />
      <List>
        <div>
          {navItems.map((item) => (
            <ListItem
              key={item.title}
              button
              component={Link}
              to={`${item.title.toLocaleLowerCase()}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={
                  currentLang === "EN"
                    ? item.title
                    : langDict.get(item.title.toLowerCase())
                }
              />
            </ListItem>
          ))}
        </div>
      </List>
    </Drawer>
  );
};

export default Navigation;
