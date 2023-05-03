import { User } from 'firebase/auth';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { onAuthChanged } from 'firebase/authentication.ts';
import { UserData, getUserData } from 'firebase/database.ts';

export type LoggedInUser = {
  user: User;
  data: UserData;
};

const AuthContext = createContext<LoggedInUser | undefined>(undefined);

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [user, setUser] = useState<LoggedInUser>();

  useEffect(() => {
    onAuthChanged(async (u) => {
      if (u) {
        localStorage.setItem('auth', 'true');
        const userData = await getUserData(u.uid);
        setUser({ user: u, data: userData as never });
      } else {
        localStorage.removeItem('auth');
        setUser(undefined);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useLoggedInUser = () => useContext(AuthContext);

export default useLoggedInUser;
