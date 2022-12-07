import { Fab } from "@mui/material";
import { stickyLeftFabSx } from "../../../assets/styles";
import AddIcon from "@mui/icons-material/Add";
import noteService from "../../../services/note.service";
import PaymentNote from "../../../components/note";
import React, { useState } from "react";

const NotesList = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: notes } = noteService.useFetchWaiterNotesQuery();
  const [post] = noteService.usePostNoteMutation();

  const handlePostNote = async () => {
    await post();
  };
  return (
    <>
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
    </>
  );
};

export default NotesList;
