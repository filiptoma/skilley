import "@fontsource/poppins/300.css";  // Weight: light
import "@fontsource/poppins/400.css";  // Weight: normal
import "@fontsource/poppins/500.css";  // Weight: medium
import "@fontsource/poppins/600.css";  // Weight: semibold
import "@fontsource/poppins/700.css";  // Weight: bold
import "@fontsource/poppins/900.css";  // Weight: black
import { ChakraProvider } from "@chakra-ui/react";

import './App.css';

import { AuthProvider } from "./hooks/useFirebaseAuth";
import theme from "./utils/theme";
import Router from "./components/Router";

const App = () => {
    return (
        <AuthProvider>
            <ChakraProvider theme={theme}>
                <Router />
            </ChakraProvider>
        </AuthProvider>
    );
};

export default App;
