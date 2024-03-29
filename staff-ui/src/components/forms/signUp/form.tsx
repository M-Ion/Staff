import React from "react";
import { LoadingButton } from "@mui/lab";
import { FormikHelpers, useFormik } from "formik";
import signUpSchema from "./validation";
import FormField from "../../commons/formField";
import { btnSubmitSx } from "../../../assets/styles";
import { SignUpManager } from "../../../types/auth.types";
import authService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

const initialValues: SignUpManager = {
  fullName: "",
  companyName: "",
  email: "",
  password: "",
  confirm: "",
};

// const initialValues: SignUpManager = {
//   fullName: "Norma Wall",
//   companyName: "Fancy",
//   email: "managerNorma@manager.com",
//   password: "P@sswordNorma1",
//   confirm: "",
// };

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = authService.useSignUpManagerMutation();

  const handleSubmit = async (
    values: SignUpManager,
    { resetForm }: FormikHelpers<SignUpManager>
  ) => {
    signUp(values)
      .unwrap()
      .then(() => {
        resetForm();
        navigate("/login");
      });
  };

  const formik = useFormik<SignUpManager>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: signUpSchema,
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

      <FormField
        formik={formik}
        label={"Company"}
        prop={"companyName"}
        fullWidth
        margin="normal"
      />

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
        Sign Up
      </LoadingButton>
    </form>
  );
};

export default SignUpForm;
