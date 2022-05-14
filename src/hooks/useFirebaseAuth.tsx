import { User } from "firebase/auth";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { onAuthChanged } from "../utils/firebase/auth";

type Props = {
    children: React.ReactNode;
};

const AuthContext = createContext<User | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    // Hold user info in state
    const [user, setUser] = useState<User>();

    // Setup onAuthChanged when component is mounted
    useEffect(() => {
        onAuthChanged((u) => {
            if (u) {
                localStorage.setItem("auth", "True");
                setUser(u);
            } else {
                localStorage.removeItem("auth");
                setUser(undefined);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={user}>{ children }</AuthContext.Provider>
    );
};

const useFirebaseAuth = () => useContext(AuthContext);

export default useFirebaseAuth;
