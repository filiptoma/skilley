import {
    Flex,
    FormLabel as FormLabelChakra,
    Text
} from "@chakra-ui/react";

type Props = {
    required?: boolean;
    children: React.ReactNode;
};

const FormLabel = ({ required, children }: Props) => {
    return (
        <Flex fontWeight="bold">
            <FormLabelChakra>
                { children }
            </FormLabelChakra>
            { required && (
                <Text
                    color="error"
                    fontSize="lg"
                    mx={-1}
                >
                    *
                </Text>
            ) }
        </Flex>
    );
};

export default FormLabel;
