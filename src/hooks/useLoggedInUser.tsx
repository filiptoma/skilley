import { User } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { onAuthChanged } from 'firebase/auth.ts';

const AuthContext = createContext<User | undefined>(undefined);

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthChanged((u) => {
      if (u) {
        localStorage.setItem('auth', 'true');
        setUser(u);
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
