import { UseToastOptions } from "@chakra-ui/react";
import { withFormik } from "formik";

import { TOAST_PROPS } from "../../common/constants";
import { RegisterFormDefaults } from "../../common/defaults";
import { TError, TRegisterForm } from "../../common/types";
import { RegisterFormSchema } from "../../common/validations";
import { e, nanoid } from "../../utils";
import { signUp } from "../../utils/firebase/auth";
import { setUser } from "../../utils/firebase/firestore/users";

import RegisterForm from "../forms/RegisterForm";

type Props = {
    toast: (options?: UseToastOptions) => void;
};

export const RegisterController = withFormik<Props, TRegisterForm>({
    mapPropsToValues: (props) => ({
        ...RegisterFormDefaults,
        toast: props.toast
    }),
    validationSchema: RegisterFormSchema,
    handleSubmit: async ({ email, password, type, toast }, { setSubmitting }) => {
        try {
            const { user } = await signUp(email, password);
            const pid = nanoid();
            await setUser(user.uid, { uid: user.uid, pid, type });
            toast({
                title: "Account created",
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
})(RegisterForm);
