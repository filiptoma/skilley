import { useToast } from "@chakra-ui/react";
import { LoginController } from "../hoc/LoginController";

const TabLogin = () => {
    const toast = useToast();
    return (
        <LoginController toast={toast} />
    );
};

export default TabLogin;
