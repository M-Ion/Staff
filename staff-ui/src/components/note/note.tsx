import { noteAccordionSummSx, noteListSx } from "../../assets/styles";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { groupOrders } from "../../utils/array.utils";
import { Note } from "../../types/note.types";
import { setNote } from "../../services/store/slices/note.slice";
import { useDispatch } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogSafe from "../commons/dialogSafe";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoteOrder from "../order";
import noteService from "../../services/note.service";
import React, { SetStateAction, useState } from "react";
import {
  setSuccess,
  setWarning,
} from "../../services/store/slices/feedback.slice";

type Props = {
  note: Note;
  expandedState: [
    string | null,
    (value: SetStateAction<string | null>) => void
  ];
};

const PaymentNote = ({ expandedState, note }: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = expandedState;

  const [completeNote] = noteService.useCompleteNoteMutation();
  const [deleteNote] = noteService.useDeleteNoteMutation();
  const groupedOrders = groupOrders(note.orders);
  const total = groupedOrders.reduce(
    (acc, current) => (acc += current.dish.price * current.quantity),
    0
  );

  const identity = note.id.split("-")[0];
  const expand = expanded === note.id;

  const handleOpen = () => setOpen(true);

  const handleComplete = async () => {
    await completeNote(note.id);
    dispatch(setSuccess(`Note ${identity} completed.`));
  };

  const handleDelete = (safe: string) => async () => {
    await deleteNote({ id: note.id, passcode: { safe } });
    dispatch(setWarning(`Note ${identity} deleted.`));
  };

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? note.id : null);
    dispatch(setNote(isExpanded ? note : null));
  };

  return (
    <>
      <Accordion expanded={expand} onChange={handleChange}>
        <AccordionSummary
          sx={noteAccordionSummSx}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{identity}</Typography>

          <Typography sx={{ color: "text.secondary" }}>{total}</Typography>
        </AccordionSummary>

        <AccordionActions>
          <IconButton onClick={handleOpen}>
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton onClick={handleComplete}>
            <CheckCircleIcon color="success" />
          </IconButton>
        </AccordionActions>

        <AccordionDetails>
          <List sx={noteListSx}>
            {groupedOrders.map((order, i) => {
              let orders: string[] = [];

              note.orders.forEach((o) => {
                if (o.dish.id === order.dish.id) {
                  orders.push(o.id);
                }
              });

              return (
                <NoteOrder
                  key={i}
                  noteId={note.id}
                  order={order}
                  orders={orders}
                />
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>

      <DialogSafe execute={handleDelete} openState={[open, setOpen]} />
    </>
  );
};

export default PaymentNote;
