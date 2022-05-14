import { Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { TUser } from "../../common/types";
import { getUser } from "../../utils/firebase/firestore/users";

import NewTestButton from "../buttons/NewTestButton";

const Dashboard = () => {
    const user = useFirebaseAuth();

    const [userData, setUserData] = useState<TUser>();

    useEffect(() => {
        (async () => {
            const res = user && await getUser(user.uid);
            res?.exists() && setUserData(res.data());
        })();
    }, [user]);

    return (
        <HStack justify="space-between">
            <Heading>
                { userData?.type === "tester" ? "Created" : "Assigned" } Tests
            </Heading>
            { userData?.type === "tester" && (
                <NewTestButton />
            ) }
        </HStack>
    );
};

export default Dashboard;
