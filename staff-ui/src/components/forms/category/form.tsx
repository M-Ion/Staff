import { btnSubmitSx, selectSx } from "../../../assets/styles";
import {
  Category,
  CreateCategory,
  DishType,
} from "../../../types/category.types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import categorySchema from "./validation";
import categoryService from "../../../services/category.service";
import FormField from "../../commons/formField";
import React, { useEffect } from "react";

type Props = {
  updateForm?: boolean;
  category?: Category;
};

const CategoryForm = ({ updateForm, category }: Props) => {
  const [post, { isLoading }] = categoryService.usePostCategoryMutation();
  const [update, { isLoading: isUpdating }] =
    categoryService.useUpdateCategoryMutation();

  const initialValues: CreateCategory = {
    name: "",
    dishType: DishType.Other,
  };

  useEffect(() => {
    if (updateForm && category) {
      initialValues.name = category.name;
      initialValues.dishType = category.dishType;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateForm, category]);

  const handleSubmit = async (
    values: CreateCategory,
    { resetForm }: FormikHelpers<CreateCategory>
  ) => {
    if (!updateForm) {
      await post(values);
      resetForm();
    } else {
      await update({ id: category?.id as string, body: values });
    }
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
        loading={!updateForm ? isLoading : isUpdating}
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

export const CategoryAddForm = () => <CategoryForm />;

type UpdateProps = {
  category: Category;
};
export const CategoryUpdateForm = ({ category }: UpdateProps) => (
  <CategoryForm updateForm={true} category={category} />
);
