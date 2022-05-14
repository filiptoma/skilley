import { IconProps } from "@chakra-ui/react";

import { LogoIcon } from "./icons/LogoIcon";

const Logo = (props: IconProps) => {
    return (
        <LogoIcon { ...props } />
    );
};

export default Logo;
