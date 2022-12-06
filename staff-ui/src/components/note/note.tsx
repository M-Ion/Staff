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
import { Note } from "../../types/note.types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import noteService from "../../services/note.service";
import React, { SetStateAction } from "react";
import NoteOrder from "../order";
import { groupOrders } from "../../utils/array.utils";
import { Order } from "../../types/order";

type Props = {
  note: Note;
  expandedState: [
    string | null,
    (value: SetStateAction<string | null>) => void
  ];
};

const PaymentNote = ({ expandedState, note }: Props) => {
  const [expanded, setExpanded] = expandedState;
  const [deleteNote] = noteService.useDeleteNoteMutation();
  const groupedOrders = groupOrders(note.orders);

  const identity = note.id.split("-")[0];
  const expand = expanded === note.id;

  const handleDelete = async () => {
    await deleteNote(note.id);
  };

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? note.id : null);
  };

  return (
    <Accordion expanded={expand} onChange={handleChange}>
      <AccordionSummary
        sx={noteAccordionSummSx}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{identity}</Typography>
      </AccordionSummary>

      <AccordionActions>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton>
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
  );
};

export default PaymentNote;
