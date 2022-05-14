import { Timestamp } from "firebase/firestore";

import { TQuestion, TTest } from "./types";

export const LoginFormDefaults = {
    email: "",
    password: ""
};

export const RegisterFormDefaults = {
    email: "",
    password: "",
    type: "tester"
};

export const QuestionDefaults: TQuestion = {
    id: 1,
    title: "",
    text: "",
    type: "open"
};

export const TestDefaults: TTest = {
    title: "",
    created: Timestamp.now(),
    modified: Timestamp.now(),
    author: "",
    reviewer: "",
    status: "pending",
    questions: [QuestionDefaults],
    messages: {
        privacy: "Skilley doesn't record or process sensitive information such as passwords, "
                 + "credit card numbers, etc. Skilley will never provide your data to third "
                 + "parties.",
        intro: "Welcome to this Test, and thank you for agreeing to participate! "
               + "The activity shouldn't take longer than 10 to 15 minutes to complete. "
               + "You will be contacted by a recruiter according to your results.",
        outro: "All done, awesome! Thanks again for your participation. You may now leave "
               + "this web page or close this window."
    }
};
