import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import React from "react";
import { btnSubmitSx } from "../../../assets/styles";
import FormField from "../../commons/formField";
import loginSchema from "./validation";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

type Props = {};

const LoginForm = (props: Props) => {
  const handleSubmit = async (values: LoginFormValues) => {
    console.log(values);
  };

  const formik = useFormik<LoginFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });
  return (
    <form className="authForm" onSubmit={formik.handleSubmit}>
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
        Login
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
