import { Button, DialogActions, DialogContentText } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import React, { SetStateAction } from "react";
import { Safe } from "../../../types/company.types";
import DialogContainer from "../dialogContainer";
import FormField from "../formField";
import safeSchema from "./validation";

type Props = {
  execute: (passcode: string) => () => {};
  openState: [boolean, (value: SetStateAction<boolean>) => void];
};

const initialValues: Safe = {
  safe: "",
};

const DialogSafe = ({ execute, openState }: Props) => {
  const [open, setOpen] = openState;

  const handleSubmit = async (
    values: Safe,
    { resetForm }: FormikHelpers<Safe>
  ) => {
    await execute(values.safe)();

    resetForm();
    setOpen(false);
  };

  const formik = useFormik<Safe>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: safeSchema,
  });

  return (
    <DialogContainer title="Safe" openState={[open, setOpen]}>
      <DialogContentText>
        Ask your manager to provide passcode to remove order from payment note.
      </DialogContentText>
      <form style={{ marginTop: "16px" }} onSubmit={formik.handleSubmit}>
        <FormField
          autoFocus
          formik={formik}
          fullWidth
          label="Passcode"
          margin="dense"
          prop={"safe"}
          type="password"
          variant="standard"
        />

        <DialogActions>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </form>
    </DialogContainer>
  );
};

export default DialogSafe;
