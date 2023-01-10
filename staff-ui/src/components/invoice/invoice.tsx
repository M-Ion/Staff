import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Order } from "../../types/order.types";
import { selectUser } from "../../services/store/slices/user.slice";
import { User } from "../../types/user.types";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { SetStateAction, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  orders: Order[];
  setPrintState: (value: SetStateAction<boolean>) => void;
};

const Invoice = ({ orders, setPrintState }: Props) => {
  const currentUser = useSelector(selectUser) as User;
  const ref = useRef<any>();

  const total = orders.reduce(
    (acc, current) => (acc += current.dish.price * current.quantity),
    0
  );

  const handleClosePrint = () => setPrintState(false);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: "Test",
  });

  return (
    <>
      <IconButton onClick={handleClosePrint}>
        <CloseIcon />
      </IconButton>
      <Box ref={ref} sx={{ padding: "16px", textAlign: "start" }}>
        <div className="flexBetween">
          <div>
            <Typography>{currentUser.company.name}</Typography>
            <Typography>Waiter: {currentUser.fullName}</Typography>
          </div>
          <IconButton onClick={handlePrint}>
            <DescriptionIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {orders.map((el) => (
            <ListItem key={el.id} disableGutters>
              <ListItemText
                primary={`${el.dish.category.name} ${el.dish.name}`}
              />
              {el.quantity} X {el.dish.price} = {el.quantity * el.dish.price}
            </ListItem>
          ))}
        </List>
        <Divider />
        <div className="alignTextEnd">Total: {total}</div>
      </Box>
    </>
  );
};

export default Invoice;
