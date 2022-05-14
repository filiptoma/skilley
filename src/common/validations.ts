import { object, string } from "yup";

export const LoginFormSchema = object().shape({
    email: string().email("Invalid email format").required("Required"),
    password: string().required("Required")
});

export const RegisterFormSchema = object().shape({
    email: string().email("Invalid email format").required("Required"),
    password: string().required("Required")
});
