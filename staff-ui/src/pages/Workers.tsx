import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { selectUser } from "../services/store/slices/user.slice";
import { useSelector } from "react-redux";
import { AppUser } from "../types/user.types";
import companyService from "../services/company.service";

type Props = {};

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

const WorkersPage = (props: Props) => {
  const { data } = companyService.useFetchWorkersQuery();
  console.log(data);

  return (
    <div style={{ height: 400, margin: "16px auto", width: "75%" }}>
      {data && (
        <DataGrid
          disableSelectionOnClick
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </div>
  );
};

export default WorkersPage;
