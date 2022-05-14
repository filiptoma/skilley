import {
    Avatar,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import {
    useCallback,
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";

import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { signOut } from "../../utils/firebase/auth";
import { TOAST_PROPS } from "../../common/constants";
import { TUser } from "../../common/types";
import { getUser } from "../../utils/firebase/firestore/users";
import { avatar } from "../../utils";

const AccountMenu = () => {
    const user = useFirebaseAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const [userData, setUserData] = useState<TUser>();

    useEffect(() => {
        (async () => {
            const res = user && await getUser(user?.uid);
            res?.exists() && setUserData(res.data());
        })();
    }, [user]);

    const onSignOut = useCallback(async () => {
        await signOut();
        navigate("/");
        toast({
            title: "Signed out",
            status: "success",
            ...TOAST_PROPS
        });
    }, [navigate, toast]);

    return (
        <Menu>
            <MenuButton>
                <HStack>
                    <Avatar name={user?.email ?? ""} src={avatar(userData?.pid)} />
                    <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{ user?.email }</Text>
                        <Text
                            color="gray.400"
                            fontSize="xs"
                            fontWeight="semibold"
                        >
                            { userData?.type.toUpperCase() }
                        </Text>
                    </VStack>
                </HStack>
            </MenuButton>
            <MenuList>
                <MenuItem onClick={onSignOut}>Sign out</MenuItem>
                <MenuItem>Delete account</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default AccountMenu;
