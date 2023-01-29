import { Box, Fab } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stickyFabSx } from "../assets/styles";
import { workersTableSx } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import {
  CategoryAddForm,
  CategoryUpdateForm,
} from "../components/forms/category/form";
import categoryService from "../services/category.service";
import DialogContainer from "../components/commons/dialogContainer";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React, { useState } from "react";
import DeleteBtn from "../components/commons/deleteBtn";
import { Category } from "../types/category.types";
import Chart from "../components/chart";
import useStats from "../hooks/useStats.hook";
import UpdateBtn from "../components/commons/updateBtn";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "dishType",
    headerName: "Type",
    width: 110,
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: (params) => {
      const { id, name, implicit } = params.row;
      return implicit ? null : <Delete id={id} name={name} />;
    },
  },
  {
    field: "update",
    headerName: "Update",
    width: 80,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: (params) => {
      const category = params.row as Category;
      return (
        <UpdateBtn>
          <CategoryUpdateForm category={category} />
        </UpdateBtn>
      );
    },
  },
];

const CategoriesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = categoryService.useFetchCategoriesQuery();

  const handleOpen = () => setOpen(true);

  const {
    data: stats,
    selectState: [selected, setSelected],
    statsById,
    byState: [by, setBy],
    handleSelectRow,
  } = useStats<Category>(
    categoryService.useFetchGeneralStatsQuery,
    categoryService.useFetchSpecificStatsMutation
  );

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
            onRowClick={handleSelectRow}
          />
        )}
        {stats && (
          <Chart<Category>
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
        icon={<PlaylistAddIcon color="primary" />}
        openState={[open, setOpen]}
      >
        <CategoryAddForm />
      </DialogContainer>
    </>
  );
};

type DeleteProps = {
  id: string;
  name: string;
};

const Delete = ({ id, name }: DeleteProps) => {
  const [deleteCategory] = categoryService.useDeleteCategoryMutation();

  const handleDelete = async () => {
    await deleteCategory(id);
  };

  return <DeleteBtn execute={handleDelete} name={name} />;
};

export default CategoriesPage;
