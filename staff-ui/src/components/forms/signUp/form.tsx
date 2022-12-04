import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import signUpSchema from "./validation";
import FormField from "../../commons/formField";
import { btnSubmitSx } from "../../../assets/styles";

export interface SignUpFormValues {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignUpFormValues = {
  fullName: "",
  companyName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const handleSubmit = async (values: SignUpFormValues) => {
    console.log(values);
  };

  const formik = useFormik<SignUpFormValues>({
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

      <LoadingButton
        loading={false}
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
