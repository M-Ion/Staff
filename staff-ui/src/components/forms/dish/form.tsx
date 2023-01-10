import { btnSubmitSx, selectSx, uploaderGridSx } from "../../../assets/styles";
import { CreateDish, Dish } from "../../../types/dish.types";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import categoryService from "../../../services/category.service";
import dishSchema from "./validation";
import FormField from "../../commons/formField";
import React, { useEffect, useState } from "react";
import dishService from "../../../services/dish.service";
import FileUploader from "../../commons/fileUploader";
import blobService from "../../../services/blob.service";
import { prepareFileFormData } from "../../../utils/formData.utils";

type Props = {
  updateForm?: boolean;
  dish?: Dish;
  rerender?: () => void;
};

const DishForm = ({ updateForm, dish, rerender }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [upload, { isLoading: isUploading }] =
    blobService.useUploadDishBlobMutation();

  const initialValues: CreateDish = {
    category: "",
    name: "",
    price: 1,
  };

  useEffect(() => {
    if (updateForm && dish) {
      initialValues.category = dish.category.id;
      initialValues.name = dish.name;
      initialValues.price = dish.price;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateForm, dish]);

  const [post, { isLoading }] = dishService.usePostDishMutation();
  const [update, { isLoading: isUpdating }] =
    dishService.useUpdateDishMutation();
  const { data: categories } = categoryService.useFetchCategoriesQuery();

  const handleSubmit = async (
    values: CreateDish,
    { resetForm }: FormikHelpers<CreateDish>
  ) => {
    let identity: string;

    if (updateForm && dish) {
      await update({
        id: dish.id,
        body: { ...values, isInStop: dish.isInStop },
      });
      identity = dish.id;
    } else {
      const response = await post(values).unwrap();
      identity = response.id;
    }

    if (file) {
      const formData = prepareFileFormData(file, identity);
      await upload(formData);

      if (rerender) rerender();
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
        loading={(!updateForm ? isLoading : isUpdating) || isUploading}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ ...btnSubmitSx }}
      >
        {!updateForm ? "Add" : "Update"}
      </LoadingButton>
    </form>
  );
};

type AddProps = {
  rerender?: () => void;
};

export const DishAddForm = ({ rerender }: AddProps) => (
  <DishForm rerender={rerender} />
);

type UpdateProps = {
  dish: Dish;
};

export const DishUpdateForm = ({ dish }: UpdateProps) => (
  <DishForm updateForm={true} dish={dish} />
);
