import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { waiterMenuBox } from "../../../assets/styles";
import CategoryTabPanel from "./categoryPanel";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { useSelector } from "react-redux";
import {
  Lang,
  selectLang,
} from "../../../services/store/slices/localization.slice";
import langDict from "../../../utils/lang.utils";

const types = ["dish", "beverage", "other"];

const Menu = () => {
  const [value, setValue] = React.useState("0");
  const currentLang = useSelector(selectLang);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={waiterMenuBox}>
        <TabList onChange={handleChange}>
          <Tab
            icon={<LocalDiningIcon />}
            label={currentLang === Lang.RO ? langDict.get("dishes") : "Dishes"}
            value={"0"}
          />
          <Tab
            icon={<LiquorIcon />}
            label={
              currentLang === Lang.RO ? langDict.get("beaverage") : "Beaverage"
            }
            value={"1"}
          />
          <Tab
            icon={<MoreHorizIcon />}
            label={currentLang === Lang.RO ? langDict.get("others") : "Others"}
            value={"2"}
          />
        </TabList>
      </Box>
      {types.map((el, i) => (
        <CategoryTabPanel key={i} value={i.toString()} dishType={i} name={el} />
      ))}
    </TabContext>
  );
};

export default Menu;
