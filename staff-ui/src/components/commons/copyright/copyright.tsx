import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { Link as RouteLink } from "react-router-dom";
import { nonDecorSx } from "../../../assets/styles";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        component={RouteLink}
        to="/register"
        color="textSecondary"
        sx={{ ...nonDecorSx }}
      >
        Staff
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
