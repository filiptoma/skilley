import { User } from 'firebase/auth';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { onAuthChanged } from 'firebase/authentication.ts';
import { UserData, getUserData } from 'firebase/database.ts';

export type LoggedInUser = {
  user: User;
  data?: UserData;
};

type LoggedInUserState = [
  LoggedInUser | undefined,
  Dispatch<SetStateAction<LoggedInUser | undefined>>,
];

const AuthContext = createContext<LoggedInUserState>(undefined as never);

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [uid, setUid] = useState<string>();
  const [user, setUser] = useState<LoggedInUser>();

  useEffect(() => {
    const unsub = onAuthChanged((u) => {
      if (u) {
        localStorage.setItem('auth', 'true');
        setUser({ user: u });
        setUid(u.uid);
      } else {
        localStorage.removeItem('auth');
        setUser(undefined);
        setUid(undefined);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!uid) return;
    getUserData(uid).then((userData) => {
      setUser((prev) => ({ ...prev!, data: userData }));
    });
  }, [uid]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

const useLoggedInUser = () => useContext(AuthContext);

export default useLoggedInUser;
