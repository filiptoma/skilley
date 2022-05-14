import { useToast } from "@chakra-ui/react";

import { RegisterController } from "../hoc/RegisterController";

const TabRegister = () => {
    const toast = useToast();
    return (
        <RegisterController toast={toast} />
    );
};

export default TabRegister;
