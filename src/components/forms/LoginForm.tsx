import { VStack } from "@chakra-ui/react";
import { Form } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";

import { FORM_FIELD_ERROR_PROPS } from "../../common/constants";

const LoginForm = () => {
    return (
        <Form>
            <VStack spacing={4} w="full">
                <InputControl
                    name="email"
                    {...FORM_FIELD_ERROR_PROPS}
                    inputProps={{
                        id: "email-login",
                        placeholder: "E-mail"
                    }}
                />
                <InputControl
                    name="password"
                    {...FORM_FIELD_ERROR_PROPS}
                    inputProps={{
                        id: "password-login",
                        placeholder: "Password",
                        type: "password"
                    }}
                />
            </VStack>
            <SubmitButton
                variant="primary"
                w="full"
                mt={10}
            >
                Login
            </SubmitButton>
        </Form>
    );
};

export default LoginForm;
