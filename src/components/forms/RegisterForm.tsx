import {
    Flex,
    Radio,
    VStack
} from "@chakra-ui/react";
import {
    InputControl,
    RadioGroupControl,
    SubmitButton
} from "formik-chakra-ui";
import { Form } from "formik";

import FormLabel from "../FormLabel";

import { FORM_FIELD_ERROR_PROPS } from "../../common/constants";

const RegisterForm = () => {
    return (
        <Form>
            <VStack spacing={4} w="full">
                <Flex direction="column" w="full">
                    <FormLabel required>Email address</FormLabel>
                    <InputControl
                        name="email"
                        {...FORM_FIELD_ERROR_PROPS}
                        inputProps={{
                            id: "email-register",
                            placeholder: "E-mail"
                        }}
                    />
                </Flex>
                <Flex direction="column" w="full">
                    <FormLabel required>Password</FormLabel>
                    <InputControl
                        name="password"
                        {...FORM_FIELD_ERROR_PROPS}
                        inputProps={{
                            id: "password-register",
                            placeholder: "Password",
                            type: "password"
                        }}
                    />
                </Flex>
                <Flex direction="column" w="full">
                    <FormLabel required>Account type</FormLabel>
                    <RadioGroupControl name="type">
                        <Radio value="tester" defaultChecked>Tester</Radio>
                        <Radio value="manager">Manager</Radio>
                    </RadioGroupControl>
                </Flex>
            </VStack>
            <SubmitButton
                variant="primary"
                w="full"
                mt={10}
            >
                Register
            </SubmitButton>
        </Form>
    );
};

export default RegisterForm;
