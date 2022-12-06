import { btnSubmitSx, selectSx } from "../../../assets/styles";
import { CreateCategory, DishType } from "../../../types/category.types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import categorySchema from "./validation";
import categoryService from "../../../services/category.service";
import FormField from "../../commons/formField";
import React from "react";

const initialValues: CreateCategory = {
  name: "Category",
  dishType: DishType.Other,
};

const CategoryForm = () => {
  const [post, { isLoading }] = categoryService.usePostCategoryMutation();

  const handleSubmit = async (
    values: CreateCategory,
    { resetForm }: FormikHelpers<CreateCategory>
  ) => {
    await post(values);
    resetForm();
  };

  const formik = useFormik<CreateCategory>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: categorySchema,
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

      <FormControl variant="standard" sx={{ ...selectSx }}>
        <InputLabel>Dish Type</InputLabel>
        <Select
          name="dishType"
          value={formik.values.dishType}
          onChange={formik.handleChange}
          label="Dish Type"
        >
          <MenuItem value={DishType.Dish}>Dish</MenuItem>
          <MenuItem value={DishType.Beverage}>Beverage</MenuItem>
          <MenuItem value={DishType.Other}>Other</MenuItem>
        </Select>
      </FormControl>

      <LoadingButton
        loading={isLoading}
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

export default CategoryForm;
