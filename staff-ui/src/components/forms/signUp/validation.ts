import * as yup from "yup";

const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "The name must be at least 2 characters")
    .required("First name is required"),
  companyName: yup
    .string()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
  email: yup.string().email("Not valid email").required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
      "Password must contains 8 characters, one uppercase, one lowercase, one number and one special case character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm password does not match")
    .required("Confirm your password"),
});

export default signUpSchema;
