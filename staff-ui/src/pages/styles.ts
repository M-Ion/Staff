import { SxProps } from "@mui/system";

export const authBgImgSx = (img: string): SxProps => ({
  backgroundImage: `url(/${img}.jpg)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

export const authAvatarSx: SxProps = {
  margin: "8px",
};
