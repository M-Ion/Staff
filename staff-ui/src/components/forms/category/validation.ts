import * as yup from "yup";

const categorySchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "The name must be at least 2 characters")
    .required("First name is required"),
  dishType: yup.string().required(),
});

export default categorySchema;
