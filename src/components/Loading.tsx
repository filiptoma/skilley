import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
    return (
        <Center minH="100vh">
            <Spinner
                size="xl"
                color="primary"
                overflowY="hidden"
            />
        </Center>
    );
};

export default Loading;
