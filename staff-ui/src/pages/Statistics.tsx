import React, { useEffect, useState } from "react";
import orderService from "../services/order.service";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const StatisticsPage = (props: Props) => {
  const [by, setBy] = useState<"Year" | "Month">("Year");

  const { data } = orderService.useFetchOrdersStatsQuery(by);

  const key = Boolean(by) ? (by === "Year" ? "key" : "key.month") : undefined;

  const handleChange = (e: SelectChangeEvent<"Year" | "Month">) =>
    setBy(e.target.value as "Year" | "Month");

  useEffect(() => {}, [by]);
  return (
    <>
      {data && (
        <>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Time By
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={by}
              onChange={handleChange}
              label="By"
            >
              <MenuItem value={"Year"}>Year</MenuItem>
              <MenuItem value={"Month"}>Month</MenuItem>
            </Select>
          </FormControl>
          <ResponsiveContainer height="80%" width="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={key} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
              <Line type="monotone" dataKey="sum" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
};

export default StatisticsPage;
