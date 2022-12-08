import { Grid, Paper } from "@mui/material";
import { fullVHSx, verticalScrollSx } from "../../assets/styles";
import Header from "../../components/header";
import useAuth from "../../hooks/useAuth.hook";
import Menu from "./components/menu";
import NotesList from "./components/notesList";

const WaiterPage = () => {
  useAuth([process.env.REACT_APP_WAITER_ROLE as string]);

  return (
    <>
      <Header />
      <Grid container component="main" sx={{ ...fullVHSx }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          p={4}
          sx={verticalScrollSx}
        >
          <NotesList />
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          component={Paper}
          square
          sx={verticalScrollSx}
        >
          <Menu />
        </Grid>
      </Grid>
    </>
  );
};

export default WaiterPage;
