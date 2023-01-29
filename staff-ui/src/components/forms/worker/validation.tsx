import * as yup from "yup";

const workerSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "The name must be at least 2 characters")
    .required("First name is required"),
  role: yup.string().required(),
  email: yup.string().email("Not valid email").required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      "Password must contains 8 characters, one uppercase, one lowercase, one number and one special case character"
    )
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password does not match")
    .required("Confirm your password"),
});

export const workerSchemaUpdate = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "The name must be at least 2 characters")
    .required("First name is required"),
  role: yup.string().required(),
  email: yup.string().email("Not valid email").required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      "Password must contains 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password does not match"),
});

export default workerSchema;
