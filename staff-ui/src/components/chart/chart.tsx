import React, { SetStateAction } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GeneralStats, SpecificStats } from "../../types/statisitcs.types";

type Props<T> = {
  data: GeneralStats<T>[];
  dataKey: string;
  entityStats: SpecificStats[] | null;
  entityDataKey: string;
  selectState: [string | null, (value: SetStateAction<string | null>) => void];
};

function Chart<T>({
  data,
  dataKey,
  entityDataKey,
  entityStats,
  selectState,
}: Props<T>) {
  const [selected] = selectState;

  return !selected ? (
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
    <ResponsiveContainer width="100%">
      <LineChart
        data={entityStats}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={entityDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <Line type="monotone" dataKey="sum" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <div>Not</div>
  );
}

export default Chart;
