import { Navigate } from "react-router-dom";

import useFirebaseAuth from "../hooks/useFirebaseAuth";
import Header from "../components/app/Header";
import { Box } from "@chakra-ui/react";

type Props = {
    child: JSX.Element | JSX.Element[];
};

const RProtected = ({ child }: Props) => {
    const isUser = useFirebaseAuth() !== undefined || localStorage.getItem("auth") !== null;
    if (!isUser) {
        return (
            <Navigate to="/" />
        );
    }
    return (
        <>
            <Header />
            <Box px={24} py={12}>
                { child }
            </Box>
        </>
    );
};

export default RProtected;
