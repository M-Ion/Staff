import { Switch } from "@mui/material";
import React from "react";
import dishService from "../../../services/dish.service";
import { Dish } from "../../../types/dish.types";

type Props = {
  dish: Dish;
};

const StopSwitch = ({ dish }: Props) => {
  const [checked, setChecked] = React.useState(dish.isInStop);
  const [update] = dishService.useUpdateDishMutation();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await update({ id: dish.id, body: { isInStop: event.target.checked } });
    setChecked(!event.target.checked);
  };

  return <Switch color="error" checked={checked} onChange={handleChange} />;
};

export default StopSwitch;
