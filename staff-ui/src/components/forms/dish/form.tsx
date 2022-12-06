import { btnSubmitSx, selectSx, uploaderGridSx } from "../../../assets/styles";
import { CreateDish } from "../../../types/dish.types";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import categoryService from "../../../services/category.service";
import dishSchema from "./validation";
import FormField from "../../commons/formField";
import React, { useState } from "react";
import dishService from "../../../services/dish.service";
import FileUploader from "../../commons/fileUploader";
import blobService from "../../../services/blob.service";
import { prepareFileFormData } from "../../../utils/formData.utils";

const initialValues: CreateDish = {
  category: "",
  name: "",
  price: 1,
};

type Props = {};

const DishForm = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [upload, { isLoading: isUploading }] =
    blobService.useUploadDishBlobMutation();

  const [post, { isLoading }] = dishService.usePostDishMutation();
  const { data: categories } = categoryService.useFetchCategoriesQuery();

  const handleSubmit = async (
    values: CreateDish,
    { resetForm }: FormikHelpers<CreateDish>
  ) => {
    const response = await post(values).unwrap();

    if (file) {
      const formData = prepareFileFormData(file, response.id);
      console.log(await upload(formData));
      console.log(file);
    }

    resetForm();
  };

  const formik = useFormik<CreateDish>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: dishSchema,
  });

  return (
    <form className="authForm" onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        label={"Name"}
        prop={"name"}
        fullWidth
        margin="normal"
      />

      <FormField
        formik={formik}
        label={"Price"}
        prop={"price"}
        fullWidth
        margin="normal"
        type="number"
      />

      <Grid container sx={uploaderGridSx}>
        <FormControl variant="standard" sx={{ ...selectSx }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            label="Category"
          >
            {categories &&
              categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FileUploader fileState={[file, setFile]} />
      </Grid>

      <LoadingButton
        loading={isLoading || isUploading}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ ...btnSubmitSx }}
      >
        Add
      </LoadingButton>
    </form>
  );
};

export default DishForm;
