import { UseToastOptions } from "@chakra-ui/react";
import { withFormik } from "formik";

import { TTest } from "../../common/types";

import NewTestForm from "../forms/NewTestForm";

type Props = {
    payload: TTest;
    toast: (options?: UseToastOptions) => void;
};

export const NewTestController = withFormik<Props, TTest>({
    mapPropsToValues: ({ payload }) => ({
        title: payload.title,
        created: payload.created,
        modified: payload.modified,
        author: payload.author,
        reviewer: payload.reviewer,
        status: payload.status,
        questions: payload.questions,
        messages: payload.messages
    }),
    handleSubmit: () => {
        // TODO: LaunchTestButton logic
    }
})(NewTestForm);
