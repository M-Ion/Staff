import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { SetStateAction } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TimeByType } from "../../hooks/useStats.hook";
import { GeneralStats, SpecificStats } from "../../types/statisitcs.types";

type Props<T> = {
  data: GeneralStats<T>[];
  dataKey: string;
  entityStats: SpecificStats[] | null;
  entityDataKey: string;
  byState: [TimeByType, React.Dispatch<React.SetStateAction<TimeByType>>];
  selectState: [string | null, (value: SetStateAction<string | null>) => void];
};

function Chart<T>({
  data,
  dataKey,
  entityDataKey,
  entityStats,
  selectState,
  byState,
}: Props<T>) {
  const [selected, setSelected] = selectState;
  const [by, setBy] = byState;

  const key = Boolean(by) ? (by === "Year" ? "key" : "key.month") : undefined;

  const handleChange = (e: SelectChangeEvent<TimeByType>) => {
    if (!e.target.value) setSelected(null);
    setBy(e.target.value as TimeByType);
  };

  return !selected && data.length > 0 ? (
    <ResponsiveContainer width="100%">
      <BarChart height={350} data={data} margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="count" fill="#2196f3" />
        <Bar dataKey="sum" fill="#f50057" />
      </BarChart>
    </ResponsiveContainer>
  ) : entityStats && entityStats.length > 0 ? (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Time By</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={by}
          onChange={handleChange}
          label="By"
        >
          <MenuItem value="">
            <em>Generals</em>
          </MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
          <MenuItem value={"Month"}>Month</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%">
        <LineChart
          data={entityStats}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={key}>
            <Label value={"test"}></Label>
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
          <Line type="monotone" dataKey="sum" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  ) : null;
}

export default Chart;
