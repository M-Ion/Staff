import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect, useState } from "react";

type Props = {
  fileState: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
};

const FileUploader = ({ fileState }: Props) => {
  const [file, setFile] = fileState;
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setSrc(url);
    } else setSrc(null);
  }, [file]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { files } = event.target;
    const isFile = Boolean(files && files.length > 0);

    if (isFile) {
      files = files as FileList;
      const lastIndex = files.length - 1;
      const lastUploaded: File = files[lastIndex];

      setFile(lastUploaded);
      return;
    }

    setFile(null);
  };

  return (
    <>
      <input
        id="icon-button-photo"
        type="file"
        hidden
        accept="image/*"
        onChange={handleChange}
        style={{ visibility: "hidden" }}
      />
      <label htmlFor="icon-button-photo">
        <Button component="span">
          <Avatar src={src ? src : undefined}>
            <AddPhotoAlternateIcon />
          </Avatar>
        </Button>
      </label>
    </>
  );
};

export default FileUploader;
