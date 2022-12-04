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

export const adminSubPageSx: SxProps = {};
