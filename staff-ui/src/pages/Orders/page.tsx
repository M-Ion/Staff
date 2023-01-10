import {
  Box,
  Breadcrumbs,
  Fab,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { containerSx } from "./styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  menuDrawer,
  stickyTopRightFabSx,
  textCapitalize,
} from "../../assets/styles";
import { Dish } from "../../types/dish.types";
import { menuColumns, ordersColumns } from "./dataGrid";
import { Op, ReqFilter } from "../../types/request.types";
import { Order } from "../../types/order.types";
import { selectUser } from "../../services/store/slices/user.slice";
import { useSelector } from "react-redux";
import dishService from "../../services/dish.service";
import Header from "../../components/header";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import orderService from "../../services/order.service";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.hook";

const OrdersPage = () => {
  useAuth(["Barkeep", "Cook"]);
  const currentUser = useSelector(selectUser);

  const [data, setData] = useState<Order[]>([]);
  const [type, setType] = useState<"Kitchen" | "Bar" | null>(null);
  const [menu, setMenu] = useState<Dish[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const { data: cookOrders } = orderService.useFetchKitchenOrdersQuery(
    undefined,
    { pollingInterval: 15000 }
  );
  const { data: barOrders } = orderService.useFetchBarOrdersQuery();

  const [fetchFiltered] = dishService.useFetchFilteredDishesMutation();

  const fetchMenu = async () => {
    if (type) {
      const filter: ReqFilter = {
        prop: "category.DishType",
        operation: Op.Eq,
        value: type === "Kitchen" ? 0 : 1,
      };
      const resp = (await fetchFiltered([filter]).unwrap()).items;
      setMenu(resp);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.roles.find((r) => r === "Barkeep")) {
        setData(barOrders ?? []);
        setType("Bar");
      } else if (currentUser.roles.find((r) => r === "Cook")) {
        setData(cookOrders ?? []);
        setType("Kitchen");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookOrders, barOrders]);

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleOpen = () => setOpenDrawer(true);

  const handleClose = () => setOpenDrawer(false);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={containerSx}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit">Orders Panel</Typography>
          <Typography color="text.primary" sx={{ ...textCapitalize }}>
            {type && type}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ flexGrow: 1, mt: 4, height: "80vh" }}>
          {data && (
            <DataGrid
              disableSelectionOnClick
              rows={data}
              columns={ordersColumns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )}
        </Box>
      </Container>

      <SwipeableDrawer
        anchor={"left"}
        open={openDrawer}
        onClose={handleClose}
        onOpen={handleOpen}
        sx={menuDrawer}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          {menu && (
            <DataGrid
              disableSelectionOnClick
              rows={menu}
              columns={menuColumns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )}
        </Box>
      </SwipeableDrawer>

      <Fab color="primary" sx={stickyTopRightFabSx} onClick={handleOpen}>
        <MenuBookIcon />
      </Fab>
    </>
  );
};

export default OrdersPage;
