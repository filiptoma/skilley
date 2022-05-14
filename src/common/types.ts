import { UseToastOptions } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";

import errors from "./errors";

export type TLoginForm = {
    email: string;
    password: string;
    toast: (options?: UseToastOptions) => void;
};

export type TRegisterForm = {
    email: string;
    password: string;
    type: string;
    toast: (options?: UseToastOptions) => void;
};

export type TError = keyof typeof errors;

export type TIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

export type TStatus = "accepted" | "rejected" | "pending";



/********************************
 ***     Firestore models     ***
 ********************************/

export type TUser = {
    uid: string;   // User ID
    pid: string;   // Personal ID
    type: string;  // Account type
};

export type TTest = {
    title: string;
    created: Timestamp,
    modified: Timestamp,
    author: string;
    reviewer: string;
    status: TStatus;
    questions: Array<TQuestion>;
    messages: {
        privacy: string;
        intro: string;
        outro: string;
    };
};

export type TQuestion = {
    id: number;
    title: string;
    text: string;
    type: "open" | "single" | "multi";
    answer?: {
        single?: string;
        multi?: string[];
    };
};
