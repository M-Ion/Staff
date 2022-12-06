import { Fab, Grid, Paper } from "@mui/material";
import { fullVHSx } from "../assets/styles";
import { stickyLeftFabSx } from "../assets/styles";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/header";
import noteService from "../services/note.service";
import PaymentNote from "../components/note";
import React from "react";

const WaiterPage = () => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const { data: notes } = noteService.useFetchWaiterNotesQuery();
  const [post] = noteService.usePostNoteMutation();

  const handlePostNote = async () => {
    await post();
  };

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
          sx={{ overflowY: "scroll", maxHeight: "100%" }}
        >
          <div>
            {notes &&
              notes.map((note) => (
                <PaymentNote
                  key={note.id}
                  note={note}
                  expandedState={[expanded, setExpanded]}
                />
              ))}
          </div>
          <Fab color="primary" sx={stickyLeftFabSx} onClick={handlePostNote}>
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={false} sm={4} md={7}></Grid>
      </Grid>
    </>
  );
};

export default WaiterPage;
