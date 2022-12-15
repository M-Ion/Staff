import { Avatar, Box, Fab } from "@mui/material";
import { Category } from "../types/category.types";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { stickyFabSx } from "../assets/styles";
import { workersTableSx } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogContainer from "../components/commons/dialogContainer";
import { DishAddForm, DishUpdateForm } from "../components/forms/dish/form";
import dishService from "../services/dish.service";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import React, { useState } from "react";
import DeleteBtn from "../components/commons/deleteBtn";
import { Dish } from "../types/dish.types";
import Chart from "../components/chart";
import useStats from "../hooks/useStats.hook";
import UpdateBtn from "../components/commons/updateBtn";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "img",
    headerName: "Img",
    width: 100,
    renderCell: (params) => {
      return <Avatar src={params.row.blob ? params.row.blob : "/food.jpg"} />;
    },
    disableColumnMenu: true,
    disableReorder: true,
  },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "category",
    headerName: "Category",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const category = params.row.category as Category;
      return category.name;
    },
  },
  {
    field: "dishType",
    headerName: "Dish Type",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const category = params.row.category as Category;
      return category.dishType;
    },
  },
  {
    field: "isInStop",
    headerName: "Stop",
    width: 100,
    renderCell: (params) => {
      return <>{params.row.isInStop ? <CancelIcon color="error" /> : null}</>;
    },
    disableColumnMenu: true,
    disableReorder: true,
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: (params) => {
      const { id, name } = params.row;
      return <Delete id={id} name={name} />;
    },
  },
  {
    field: "update",
    headerName: "Update",
    width: 80,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: (params) => {
      const dish = params.row as Dish;
      return (
        <UpdateBtn>
          <DishUpdateForm dish={dish} />
        </UpdateBtn>
      );
    },
  },
];

const DishesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = dishService.useFetchDishesQuery();

  const handleOpen = () => setOpen(true);

  const {
    data: stats,
    byState: [by, setBy],
    selectState: [selected, setSelected],
    statsById,
    handleSelectRow,
  } = useStats<Dish>(
    dishService.useFetchGeneralDishStatsQuery,
    dishService.useFetchSpecificDishStatsMutation
  );

  return (
    <>
      <Box sx={{ ...workersTableSx }}>
        {data && (
          <DataGrid
            disableSelectionOnClick
            onRowClick={handleSelectRow}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        )}
      </Box>

      <Box sx={{ ...workersTableSx }}>
        {stats && (
          <Chart<Dish>
            byState={[by, setBy]}
            data={stats}
            dataKey={"key.name"}
            entityDataKey={`key.${by?.toLocaleLowerCase()}`}
            entityStats={statsById}
            selectState={[selected, setSelected]}
          />
        )}
      </Box>

      <Fab color="primary" onClick={handleOpen} sx={stickyFabSx}>
        <AddIcon />
      </Fab>
      <DialogContainer
        icon={<FastfoodIcon color="primary" />}
        openState={[open, setOpen]}
      >
        <DishAddForm />
      </DialogContainer>
    </>
  );
};

type Props = {
  id: string;
  name: string;
};

const Delete = ({ id, name }: Props) => {
  const [deleteDish] = dishService.useDeleteDishMutation();

  const handleDelete = async () => {
    await deleteDish(id);
  };

  return <DeleteBtn execute={handleDelete} name={name} />;
};

export default DishesPage;
