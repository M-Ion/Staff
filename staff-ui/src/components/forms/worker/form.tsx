import React from "react";
import { LoadingButton } from "@mui/lab";
import { FormikHelpers, useFormik } from "formik";
import FormField from "../../commons/formField";
import { btnSubmitSx, selectSx } from "../../../assets/styles";
import { SignUpStaff, StaffRoles } from "../../../types/auth.types";
import workerSchema from "./validation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import authService from "../../../services/auth.service";

const initialValues: SignUpStaff = {
  fullName: "Norma Wall",
  companyName: "",
  email: "managerNorma@manager.com",
  password: "P@sswordNorma1",
  confirm: "",
  role: StaffRoles.Waiter,
};

const WorkerForm = () => {
  const [signUp, { isLoading }] = authService.useSignUpStaffMutation();

  const handleSubmit = async (
    values: SignUpStaff,
    { resetForm }: FormikHelpers<SignUpStaff>
  ) => {
    await signUp(values);
    resetForm();
  };

  const formik = useFormik<SignUpStaff>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: workerSchema,
  });

  return (
    <form className="authForm" onSubmit={formik.handleSubmit}>
      <FormField
        formik={formik}
        label={"Full Name"}
        prop={"fullName"}
        fullWidth
        margin="normal"
      />

      <FormControl variant="standard" sx={{ ...selectSx }}>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          label="Role"
        >
          <MenuItem value={StaffRoles.Cook}>Cook</MenuItem>
          <MenuItem value={StaffRoles.Barkeep}>Barkeep</MenuItem>
          <MenuItem value={StaffRoles.Waiter}>Waiter</MenuItem>
        </Select>
      </FormControl>

      <FormField
        formik={formik}
        label={"Email"}
        prop={"email"}
        fullWidth
        margin="normal"
      />

      <FormField
        formik={formik}
        fullWidth
        label={"Password"}
        margin="normal"
        prop={"password"}
        type="password"
      />

      <FormField
        formik={formik}
        fullWidth
        label={"Confirm password"}
        margin="normal"
        prop={"confirm"}
        type="password"
      />

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

export default WorkerForm;
