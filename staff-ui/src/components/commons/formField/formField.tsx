import { BaseTextFieldProps, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

type Props = {
  formik: FormikProps<any>;
  label: string;
  prop: string;
};

const FormField = ({
  formik,
  label,
  prop,
  ...others
}: Props & BaseTextFieldProps) => {
  const { errors, touched, values } = formik;

  const error = touched[prop] && Boolean(errors[prop]);
  const helperText = (touched[prop] && errors[prop]) as string;
  const value = values[prop];

  return (
    <TextField
      name={prop}
      label={label}
      value={value}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      helperText={helperText}
      error={error}
      variant="standard"
      {...others}
    />
  );
};

export default FormField;
