import { customAlphabet } from "nanoid";

import { ALPHABET, AVATAR_TYPE } from "../common/constants";
import errors from "../common/errors";
import { TError } from "../common/types";

export const e = (err: TError) => errors[err];

export const avatar = (pid: string | undefined) =>
    `https://avatars.dicebear.com/api/${AVATAR_TYPE}/${pid}.svg`

export const nanoid = customAlphabet(ALPHABET, 4);
