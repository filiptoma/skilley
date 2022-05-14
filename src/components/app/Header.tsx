import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import AccountMenu from "./AccountMenu";

import Logo from "../Logo";

const Header = () => {
    const navigate = useNavigate();
    return (
        <HStack
            justify="space-between"
            px={8}
            py={4}
            borderBottom="1px"
            borderColor="gray.200"
        >
            <AccountMenu />
            <Logo
                onClick={() => navigate("/app")}
                width={32}
                height={16}
            />
        </HStack>
    );
};

export default Header;
