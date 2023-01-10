import { LoadingButton } from "@mui/lab";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { btnSubmitSx } from "../../../assets/styles";
import authService from "../../../services/auth.service";
import { setSuccess } from "../../../services/store/slices/feedback.slice";
import { setState, UserState } from "../../../services/store/slices/user.slice";
import { Login } from "../../../types/auth.types";
import FormField from "../../commons/formField";
import loginSchema from "./validation";

const initialValues: Login = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const [login, { isLoading }] = authService.useLoginMutation();

  const handleSubmit = (values: Login, { resetForm }: FormikHelpers<Login>) => {
    login(values)
      .unwrap()
      .then((response) => {
        const user: UserState = {
          currentUser: response.user,
          token: response.token,
        };

        resetForm();
        dispatch(setState(user));
        dispatch(setSuccess("Your are successfully  logged in"));
      });
  };

  const formik = useFormik<Login>({
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
        loading={isLoading}
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
