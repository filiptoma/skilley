import { Icon, IconProps } from "@chakra-ui/react";

const CircleIcon = (props: IconProps) => {
    return (
        <Icon viewBox="0 0 200 200" color={props.color}>
            <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
        </Icon>
    );
};

export default CircleIcon;
