import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { FormikHelpers, useFormik } from "formik";
import FormField from "../../commons/formField";
import { btnSubmitSx, selectSx } from "../../../assets/styles";
import { SignUpStaff, StaffRoles } from "../../../types/auth.types";
import workerSchema, { workerSchemaUpdate } from "./validation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import authService from "../../../services/auth.service";
import { WorkerUser } from "../../../types/user.types";

const initialValues: SignUpStaff = {
  fullName: "",
  email: "",
  password: "",
  companyName: "",
  confirm: "",
  role: StaffRoles.Waiter,
};

type Props = {
  updateForm?: boolean;
  user?: WorkerUser;
};

const Form = ({ updateForm, user }: Props) => {
  const [signUp, { isLoading }] = authService.useSignUpStaffMutation();
  const [update, { isLoading: isUpdating }] =
    authService.useUpdateWorkerMutation();

  const handleSubmit = async (
    values: SignUpStaff,
    { resetForm }: FormikHelpers<SignUpStaff>
  ) => {
    if (updateForm && user) {
      update({ id: user.id, body: values }).then(() => resetForm());
    } else {
      signUp(values).then(() => resetForm());
    }
  };

  useEffect(() => {
    if (updateForm && user) {
      const role = user.roles[0];

      initialValues.fullName = user.fullName;
      initialValues.email = user.email;
      initialValues.role = (StaffRoles as any)[role];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateForm, user]);

  const formik = useFormik<SignUpStaff>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: !updateForm ? workerSchema : workerSchemaUpdate,
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

const WorkerForm = () => <Form />;
export default WorkerForm;

type UpdateProps = {
  user: WorkerUser;
};
export const WorkerUpdateForm = ({ user }: UpdateProps) => (
  <Form updateForm={true} user={user} />
);
