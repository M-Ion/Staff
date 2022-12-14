import { GeneralStats, SpecificStats } from "../types/statisitcs.types";
import { GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  UseMutation,
  UseQuery,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/dist/query";

export default function useStats<T>(
  fetchData: UseQuery<QueryDefinition<any, any, any, any>>,
  fetchDataById: UseMutation<MutationDefinition<any, any, any, any>>
): StatsHookType<T> {
  const [select, setSelect] = useState<string | null>(null);
  const [by, setBy] = useState<TimeByType>("Year");
  const [statsById, setStatsById] = useState<SpecificStats[]>([]);

  const data = fetchData(undefined).data as GeneralStats<T>[];
  const [fetch] = fetchDataById();

  const handleFetch = async () => {
    if (select) {
      const response = await fetch({ id: select, by: by ?? "Year" }).unwrap();
      setStatsById(response);
    }
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select, by]);

  const handleSelectRow = (e: GridRowParams) => setSelect(e.row.id);

  return {
    data,
    byState: [by, setBy],
    selectState: [select, setSelect],
    statsById,
    handleSelectRow,
  };
}

export type StatsHookType<T> = {
  data: GeneralStats<T>[];
  byState: [TimeByType, React.Dispatch<React.SetStateAction<TimeByType>>];
  selectState: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ];
  statsById: SpecificStats[];
  handleSelectRow: (e: GridRowParams) => void;
};

export type TimeByType = "Year" | "Month" | "";
