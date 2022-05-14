import {
    Center,
    Divider,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import TabLogin from "./tabs/TabLogin";
import TabRegister from "./tabs/TabRegister";

import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Home = () => {
    const isUser = useFirebaseAuth() !== undefined || localStorage.getItem("auth") !== null;
    const navigate = useNavigate();
    useEffect(() => {
        if (isUser) {
            navigate("/app");
        }
    }, [isUser, navigate]);
    return (
        <Center my={10}>
            <VStack spacing={10} w={400}>
                <Logo width={48} height={24} />
                <Tabs variant="pills" w="full">
                    <TabList display="flex" justifyContent="center">
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </TabList>
                    <Divider my={4} />
                    <TabPanels>
                        <TabPanel>
                            <TabLogin />
                        </TabPanel>
                        <TabPanel>
                            <TabRegister />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Center>
    );
};

export default Home;
