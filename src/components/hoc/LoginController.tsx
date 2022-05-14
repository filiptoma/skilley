import { UseToastOptions } from "@chakra-ui/react";
import { withFormik } from "formik";

import { TOAST_PROPS } from "../../common/constants";
import { LoginFormDefaults } from "../../common/defaults";
import { TError, TLoginForm } from "../../common/types";
import { LoginFormSchema } from "../../common/validations";
import { e } from "../../utils";
import { signIn } from "../../utils/firebase/auth";

import LoginForm from "../forms/LoginForm";

type Props = {
    toast: (options?: UseToastOptions) => void;
};

export const LoginController = withFormik<Props, TLoginForm>({
    mapPropsToValues: (props) => ({
        ...LoginFormDefaults,
        toast: props.toast
    }),
    validationSchema: LoginFormSchema,
    handleSubmit: async ({ email, password, toast }, { setSubmitting }) => {
        try {
            await signIn(email, password);
            toast({
                title: "Signed in",
                status: "success",
                ...TOAST_PROPS
            });
            setSubmitting(false);
        } catch (err) {
            toast({
                title: e("fail"),
                description: e((err as { code: TError })?.code),
                status: "error",
                ...TOAST_PROPS
            });
            setSubmitting(false);
        }
    }
})(LoginForm);
