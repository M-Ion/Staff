import { Avatar } from "@mui/material";
import { Category } from "../../types/category.types";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Order } from "../../types/order.types";
import FinishBtn from "./finishBtn";
import StopSwitch from "./stopSwitch";
import { Dish } from "../../types/dish.types";

export const ordersColumns: GridColDef[] = [
  {
    field: "order",
    headerName: "Order",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => {
      const order = params.row as Order;
      return `${order.dish.category.name} ${order.dish.name}`;
    },
  },
  {
    field: "time",
    headerName: "Time",
    width: 130,
    valueGetter: (params: GridValueGetterParams) => {
      const order = params.row as Order;
      return new Date(order.created).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    field: "by",
    headerName: "By",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => {
      const order = params.row as Order;
      return order.user.fullName;
    },
  },
  {
    field: "requirements",
    headerName: "Requirements",
    width: 400,
    valueGetter: (params: GridValueGetterParams) => {
      return "";
    },
  },
  {
    field: "finish",
    headerName: "Finish",
    width: 75,
    disableColumnMenu: true,
    disableReorder: true,
    renderCell: (params) => {
      const order = params.row as Order;
      return <FinishBtn orderId={order.id} />;
    },
  },
];

export const menuColumns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
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
  {
    field: "category",
    headerName: "Category",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => {
      const category = params.row.category as Category;
      return category.name;
    },
  },
  {
    field: "isInStop",
    headerName: "Stop",
    width: 100,
    renderCell: (params) => {
      const dish = params.row as Dish;
      return <StopSwitch dish={dish} />;
    },
    disableColumnMenu: true,
    disableReorder: true,
  },
];
