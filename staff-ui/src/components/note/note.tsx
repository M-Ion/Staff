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
import { groupOrders, groupOrdersForCheckout } from "../../utils/array.utils";
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
  setSuccessWithUndo,
  setWarning,
} from "../../services/store/slices/feedback.slice";
import PrintIcon from "@mui/icons-material/Print";
import Invoice from "../invoice";

type Props = {
  note: Note;
  expandedState: [
    string | null,
    (value: SetStateAction<string | null>) => void
  ];
};

const PaymentNote = ({ expandedState, note }: Props) => {
  const dispatch = useDispatch();

  const [printState, setPrintState] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = expandedState;

  const [completeNote] = noteService.useCompleteNoteMutation();
  const [undoNote] = noteService.useUndoNoteMutation();
  const [deleteNote] = noteService.useDeleteNoteMutation();
  const groupedOrders = groupOrders(note.orders);
  const checkoutOrders = groupOrdersForCheckout(note.orders);

  const total = groupedOrders.reduce(
    (acc, current) => (acc += current.dish.price * current.quantity),
    0
  );

  const identity = note.id.split("-")[0];
  const expand = expanded === note.id;

  const handleOpen = () => setOpen(true);

  const handleUndo = async () => {
    await undoNote(note.id);
    setSuccess(`Note ${identity} undo.`);
  };

  const handleComplete = async () => {
    await completeNote(note.id);
    dispatch(
      setSuccessWithUndo({
        message: `Note ${identity} completed.`,
        undo: handleUndo,
      })
    );
  };

  const handleDelete = (safe: string) => async () => {
    deleteNote({ id: note.id, passcode: { safe } })
      .unwrap()
      .then(() => dispatch(setWarning(`Note ${identity} deleted.`)));
  };

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? note.id : null);
    dispatch(setNote(isExpanded ? note : null));
  };

  const togglePrint = () => setPrintState(true);

  return (
    <>
      {!printState ? (
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
            <IconButton onClick={togglePrint}>
              <PrintIcon />
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
      ) : (
        <Invoice orders={checkoutOrders} setPrintState={setPrintState} />
      )}

      <DialogSafe execute={handleDelete} openState={[open, setOpen]} />
    </>
  );
};

export default PaymentNote;
