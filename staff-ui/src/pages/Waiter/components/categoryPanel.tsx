import { Tab, Tabs } from "@mui/material";
import { Category } from "../../../types/category.types";
import { Op, ReqFilter } from "../../../types/request.types";
import { TabContext, TabPanel, TabPanelProps } from "@mui/lab";
import categoryService from "../../../services/category.service";
import React, { useEffect, useState } from "react";
import ItemsPanel from "./itemsPanel";

type CategoryTabPanelProps = {
  dishType: number;
  name: string;
};

const CategoryTabPanel = ({
  name,
  dishType,
  ...others
}: CategoryTabPanelProps & TabPanelProps) => {
  const [data, setData] = useState<Category[]>([]);
  const [value, setValue] = useState<string>("0");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [fetch] = categoryService.useFetchFilteredCategoriesMutation();

  const filter: ReqFilter = {
    prop: "dishType",
    operation: Op.Eq,
    value: dishType,
  };

  const fetchData = async () => {
    const response = await fetch([filter]).unwrap();
    setData(response.items);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabPanel {...others} sx={{ px: 0 }}>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {data &&
            data.map((el, i) => (
              <Tab key={el.id} label={el.name} value={i.toString()} />
            ))}
        </Tabs>
        {data.map((el, i) => (
          <ItemsPanel key={el.id} category={el.id} value={i.toString()} />
        ))}
      </TabContext>
    </TabPanel>
  );
};

export default CategoryTabPanel;
