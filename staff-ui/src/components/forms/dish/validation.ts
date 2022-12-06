import * as yup from "yup";

const dishSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "The name must be at least 2 characters")
    .required("Name is required"),
  price: yup.number().min(1).required(),
});

export default dishSchema;
