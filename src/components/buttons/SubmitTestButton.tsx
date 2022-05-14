import { SubmitButton } from "formik-chakra-ui";
import { SpeakerphoneIcon } from "@heroicons/react/solid";
import { Icon } from "@chakra-ui/react";

const SubmitTestButton = () => {
    return (
        <SubmitButton
            variant="success"
            onClick={() => {}}
            isLoading={false}
            leftIcon={<Icon as={SpeakerphoneIcon} />}
            iconSpacing={4}
        >
            Submit Concept
        </SubmitButton>
    );
};

export default SubmitTestButton;
