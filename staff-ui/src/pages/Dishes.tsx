import { Avatar, Box, Fab } from "@mui/material";
import { Category } from "../types/category.types";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { stickyFabSx } from "../assets/styles";
import { workersTableSx } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogContainer from "../components/commons/dialogContainer";
import DishForm from "../components/forms/dish";
import dishService from "../services/dish.service";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import React, { useState } from "react";
import DeleteBtn from "../components/commons/deleteBtn";

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
];

const DishesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = dishService.useFetchDishesQuery();

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box sx={{ ...workersTableSx }}>
        {data && (
          <DataGrid
            disableSelectionOnClick
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
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
        <DishForm />
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
