import { HStack, Text } from "@chakra-ui/react";

import { TStatus } from "../../common/types";

import CircleIcon from "../icons/CircleIcon";

type Props = {
    status: TStatus;
};

const TestStatus = ({ status }: Props) => {
    return (
        <HStack
            fontWeight="bold"
            align="left"
            justify="left"
            spacing={1}
        >
            <CircleIcon color={`test.${status}`} />
            <Text color="gray.400" fontSize="xs">
                { status.toUpperCase() }
            </Text>
        </HStack>
    );
};

export default TestStatus;
