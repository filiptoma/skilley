import {
    Button,
    Icon,
    useToast
} from "@chakra-ui/react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { setTest } from "../../utils/firebase/firestore/tests";
import { TestDefaults } from "../../common/defaults";
import { e, nanoid } from "../../utils";
import { TError } from "../../common/types";
import { TOAST_PROPS } from "../../common/constants";

const NewTestButton = () => {
    const user = useFirebaseAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    const createTest = useCallback(async () => {
        setSubmitting(true);
        const testId = nanoid();
        try {
            await setTest(testId, {
                ...TestDefaults,
                title: `New test #${testId}`,
                author: user?.email ?? ""
            });
            navigate(`/app/new?id=${testId}`);
            setSubmitting(false);
        } catch (err) {
            toast({
                title: e("fail"),
                description: e((err as { code: TError })?.code),
                status: "error",
                ...TOAST_PROPS
            });
            setSubmitting(false);
        }
    }, [navigate, toast, user?.email]);

    return (
        <Button
            variant="primary"
            onClick={createTest}
            isLoading={isSubmitting}
            leftIcon={<Icon as={PlusCircleIcon} />}
            iconSpacing={4}
        >
            New Test
        </Button>
    );
};

export default NewTestButton;
