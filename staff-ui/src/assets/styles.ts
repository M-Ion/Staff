import { SxProps } from "@mui/system";

export const flexColumnSx: SxProps = {
  display: "flex",
  flexDirection: "column",
};

export const fullVHSx: SxProps = {
  height: "calc(100vh - 68.5px)", // 100vh - <Header height>
};

export const fullWidthWithNav = {
  ml: `${240}px`,
  width: `calc(100% - ${240}px)`,
};

export const fullW: SxProps = {
  width: "100%",
};

export const alignLeftSx: SxProps = {
  alignSelf: "flex-start",
};

export const alignCenterSx: SxProps = {
  alignSelf: "center",
};

export const btnSubmitSx: SxProps = {
  margin: "24px 0 16px",
};

export const nonDecorSx: SxProps = {
  textDecoration: "none",
};

export const logoIconSx: SxProps = {
  mr: 1,
};

export const logoTitleSx: SxProps = {
  color: "inherit",
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  mr: 2,
  textDecoration: "none",
};

export const growSx: SxProps = {
  flexGrow: 1,
};

export const headerBtnSx: SxProps = {
  color: "white",
  display: "block",
  my: 2,
};

export const navSx: SxProps = {
  width: 240,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
  },
};

export const selectSx: SxProps = {
  my: 1,
  minWidth: 120,
};

export const stickyFabSx = {
  bottom: 20,
  left: "auto",
  margin: 0,
  position: "fixed",
  right: 20,
  top: "auto",
};

export const stickyLeftFabSx = {
  bottom: 20,
  left: 20,
  margin: 0,
  position: "fixed",
  right: "auto",
  top: "auto",
};

export const uploaderGridSx: SxProps = {
  alignItems: "flex-end",
  justifyContent: "space-between",
};

export const noteAccordionSx: SxProps = {
  "&.Mui-expanded": {
    backgroundColor: "#a5a5a5",
    maxHeight: 15,
    minHeight: 15,
  },
};

export const noteAccordionSummSx: SxProps = {
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export const noteListSx: SxProps = {
  bgcolor: "background.paper",
  width: "100%",
};

export const verticalScrollSx: SxProps = {
  maxHeight: "100%",
  overflowY: "scroll",
};

export const waiterMenuBox: SxProps = {
  borderBottom: 1,
  borderColor: "divider",
};

export const categoryPaper: SxProps = {
  height: 80,
  lineHeight: "80px",
  textAlign: "center",
  width: "100%",
};

export const feedbackStatusSx: SxProps = {
  textAlign: "start",
  textTransform: "capitalize",
};
