import { Grid } from "@mui/material";
import { TabPanel, TabPanelProps } from "@mui/lab";
import dishService from "../../../services/dish.service";
import React from "react";
import ItemCard from "./itemCard";

type Props = {
  category: string;
};

const ItemsPanel = ({ category, ...others }: Props & TabPanelProps) => {
  const { data } = dishService.useFetchDishesByCategoryQuery(category);

  return (
    <TabPanel {...others}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data &&
          data.map((el, i) => (
            <Grid item xs={2} sm={3} md={3} lg={4} key={i}>
              <ItemCard item={el} />
            </Grid>
          ))}
      </Grid>
    </TabPanel>
  );
};

export default ItemsPanel;
