import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Dish } from "../../../types/dish.types";
import AddIcon from "@mui/icons-material/Add";
import orderService from "../../../services/order.service";
import { selectExpandedNote } from "../../../services/store/slices/note.slice";
import { useSelector } from "react-redux";

type Props = {
  item: Dish;
};

const ItemCard = ({ item }: Props) => {
  const expandedNote = useSelector(selectExpandedNote);
  const [postOrder] = orderService.usePostOrderMutation();

  const handlePost = async () => {
    if (expandedNote) await postOrder({ dish: item.id, note: expandedNote.id });
  };

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.blob ?? "/default.jpg"}
      />
      <CardContent sx={{ textAlign: "start" }}>
        <Typography gutterBottom variant="h5" component="div">
          {`${item.category.name} ${item.name}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price {item.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={handlePost}
          disabled={!Boolean(expandedNote)}
        >
          <AddIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
