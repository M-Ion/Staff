import { Box, Fab } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stickyFabSx } from "../assets/styles";
import { workersTableSx } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import CategoryForm from "../components/forms/category";
import categoryService from "../services/category.service";
import DialogContainer from "../components/commons/dialogContainer";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import React, { useState } from "react";
import DeleteBtn from "../components/commons/deleteBtn";

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
      const { id, name } = params.row;
      return <Delete id={id} name={name} />;
    },
  },
];

const CategoriesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = categoryService.useFetchCategoriesQuery();

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
        icon={<PlaylistAddIcon color="primary" />}
        openState={[open, setOpen]}
      >
        <CategoryForm />
      </DialogContainer>
    </>
  );
};

type Props = {
  id: string;
  name: string;
};

const Delete = ({ id, name }: Props) => {
  const [deleteCategory] = categoryService.useDeleteCategoryMutation();

  const handleDelete = async () => {
    await deleteCategory(id);
  };

  return <DeleteBtn execute={handleDelete} name={name} />;
};

export default CategoriesPage;
