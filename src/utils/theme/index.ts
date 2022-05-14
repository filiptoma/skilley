import {
    extendTheme,
    theme as baseTheme,
    withDefaultVariant
} from "@chakra-ui/react";

import colors from "./colors";

import { Button } from "./components/button";
import { Input } from "./components/input";
import { Tabs } from "./components/tabs";

const theme = extendTheme({
    fonts: {
        heading: `Poppins, ${baseTheme.fonts?.heading}`,
        body: `Poppins, ${baseTheme.fonts?.body}`
    },
    colors,
    components: {
        Tabs,
        Input,
        Button
    }},
    withDefaultVariant({
        variant: "filled",
        components: ["Input"]
    })
);

export default theme;
