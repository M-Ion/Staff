import { Avatar, IconButton } from "@mui/material";
import { selectUser } from "../../services/store/slices/user.slice";
import { User } from "../../types/user.types";
import { useSelector } from "react-redux";
import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import OnlyAuth from "../commons/onlyAuth";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import companyService from "../../services/company.service";
import { UpdateCompany } from "../../types/company.types";

type Props = {};

const Profile = (props: Props) => {
  const currentUser = useSelector(selectUser) as User;

  return (
    <>
      <Avatar sx={{ m: "auto" }}>{currentUser.fullName[0]}</Avatar>
      <MenuList sx={{ width: 320 }}>
        <MenuItem disableTouchRipple>
          <ListItemText>Name</ListItemText>
          <Typography variant="body2" color="text.secondary">
            {currentUser.fullName}
          </Typography>
        </MenuItem>
        <MenuItem disableTouchRipple>
          <ListItemText>Email</ListItemText>
          <Typography variant="body2" color="text.secondary">
            {currentUser.email}
          </Typography>
        </MenuItem>
        <MenuItem disableTouchRipple>
          <ListItemText>Company</ListItemText>
          <Typography variant="body2" color="text.secondary">
            {currentUser.company.name}
          </Typography>
        </MenuItem>
        <MenuItem disableTouchRipple>
          <ListItemText>Role</ListItemText>
          <Typography variant="body2" color="text.secondary">
            {currentUser.roles[0]}
          </Typography>
        </MenuItem>

        <OnlyAuth roles={[process.env.REACT_APP_MANAGER_ROLE as string]}>
          <Divider />
          <SafePasscode />
        </OnlyAuth>
      </MenuList>
    </>
  );
};

const SafePasscode = () => {
  const { data } = companyService.useFetchCompanyQuery();
  const [update] = companyService.useUpdateCompanyMutation();

  const handleUpdate = async () => {
    const body: UpdateCompany = {
      safe: Math.floor(Math.random() * 100000).toString(),
    };

    await update(body);
  };
  return (
    <MenuItem disableTouchRipple>
      <IconButton onClick={handleUpdate}>
        <RefreshIcon fontSize="small" />
      </IconButton>
      <ListItemText>Secret passcode</ListItemText>
      <Typography variant="body2" color="text.secondary">
        {data?.safe}
      </Typography>
    </MenuItem>
  );
};

export default Profile;
