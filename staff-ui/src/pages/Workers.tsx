import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import companyService from "../services/company.service";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { workersTableSx } from "./styles";
import { Box, Fab } from "@mui/material";
import WorkerForm from "../components/forms/worker";
import DialogContainer from "../components/commons/dialogContainer";
import { stickyFabSx } from "../assets/styles";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "fullName", headerName: "Full name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "roles",
    headerName: "Role",
    width: 120,
  },
];

const WorkersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = companyService.useFetchWorkersQuery();

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
        icon={<GroupAddIcon color="primary" />}
        openState={[open, setOpen]}
      >
        <WorkerForm />
      </DialogContainer>
    </>
  );
};

export default WorkersPage;
