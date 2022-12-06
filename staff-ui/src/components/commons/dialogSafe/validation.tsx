import * as yup from "yup";

const safeSchema = yup.object().shape({
  safe: yup.string().required("Passcode is required"),
});

export default safeSchema;
