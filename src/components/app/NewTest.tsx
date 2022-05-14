import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { TOAST_PROPS } from "../../common/constants";
import { TTest } from "../../common/types";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { e } from "../../utils";
import { getTest } from "../../utils/firebase/firestore/tests";

import { NewTestController } from "../hoc/NewTestController";
import Loading from "../Loading";

const NewTest = () => {
    const user = useFirebaseAuth();
    const toast = useToast();

    const [searchParams] = useSearchParams();
    const [test, setTest] = useState<TTest>();
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const testId = searchParams.get("id") as never;
            try {
                const res = user && await getTest(testId);
                res?.exists() && setTest(res.data());
            } catch (err) {
                toast({
                    title: e("fail"),
                    description: e("unknown"),
                    status: "error",
                    ...TOAST_PROPS
                });
            }
            setLoading(false);
        })();
    }, [searchParams, toast, user]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            { test && (
                <NewTestController payload={test} toast={toast} />
            ) }
        </>
    );
};

export default NewTest;
