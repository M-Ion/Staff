import { fileExtension } from "./string.utils";

export const prepareFileFormData = (file: File, id: string) => {
  const formData = new FormData();

  formData.append("file", file, `${id}.${fileExtension(file.name)}`);

  return formData;
};
