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
import Chart from "../components/chart";
import useStats from "../hooks/useStats.hook";
import { WorkerUser } from "../types/user.types";
import UpdateBtn from "../components/commons/updateBtn";
import { WorkerUpdateForm } from "../components/forms/worker/form";

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
  {
    field: "update",
    headerName: "Update",
    width: 80,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: (params) => {
      const user = params.row as WorkerUser;
      return (
        <UpdateBtn>
          <WorkerUpdateForm user={user} />
        </UpdateBtn>
      );
    },
  },
];

const WorkersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = companyService.useFetchWorkersQuery();

  const handleOpen = () => setOpen(true);

  const {
    data: stats,
    selectState: [selected, setSelected],
    statsById,
    byState: [by, setBy],
    handleSelectRow,
  } = useStats<WorkerUser>(
    companyService.useFetchGeneralWorkersStatsQuery,
    companyService.useFetchSpecificWorkersStatsMutation
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
        {stats && (
          <Chart<WorkerUser>
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
        icon={<GroupAddIcon color="primary" />}
        openState={[open, setOpen]}
      >
        <WorkerForm />
      </DialogContainer>
    </>
  );
};

export default WorkersPage;
