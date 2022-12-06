import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { btnSubmitSx } from "../../../assets/styles";
import authService from "../../../services/auth.service";
import { setState, UserState } from "../../../services/store/slices/user.slice";
import { Login } from "../../../types/auth.types";
import FormField from "../../commons/formField";
import loginSchema from "./validation";

// const initialValues: Login = {
//   email: "managerPaul@manager.com",
//   password: "P@sswordPaul1",
// };

const initialValues: Login = {
  email: "managerNorma3@manager.com",
  password: "P@ssword1",
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const [login, { isLoading }] = authService.useLoginMutation();

  const handleSubmit = async (values: Login) => {
    const response = await login(values).unwrap();
    const user: UserState = {
      currentUser: response.user,
      token: response.token,
    };

    dispatch(setState(user));
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
