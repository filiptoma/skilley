import {
    Divider,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack
} from "@chakra-ui/react";
import { Form, FormikProps } from "formik";

import { TTest } from "../../common/types";

import TestStatus from "../app/TestStatus";
import SubmitTestButton from "../buttons/SubmitTestButton";
import TabGeneral from "../tabs/TabGeneral";
import TabMessages from "../tabs/TabMessages";
import TabQuestions from "../tabs/TabQuestions";

const NewTestForm = ({ values }: FormikProps<TTest>) => {
    return (
        <Form>
            <HStack justify="space-between" mb={16}>
                <VStack align="left">
                    <Text fontSize="2xl" fontWeight="bold">
                        {values.title}
                    </Text>
                    <TestStatus status={values.status} />
                </VStack>
                <SubmitTestButton />
            </HStack>
            <Tabs variant="pills" isLazy>
                <TabList>
                    <Tab>General</Tab>
                    <Tab>Messages</Tab>
                    <Tab>Questions</Tab>
                </TabList>
                <Divider my={3} />
                <TabPanels mt={8}>
                    <TabPanel>
                        <TabGeneral />
                    </TabPanel>
                    <TabPanel>
                        <TabMessages />
                    </TabPanel>
                    <TabPanel>
                        <TabQuestions />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Form>
    );
};

export default NewTestForm;
