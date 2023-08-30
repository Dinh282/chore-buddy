import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../graphql/queries'

export const CurrentUserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrentUserContext = () => useContext(CurrentUserContext);

export default function CurrentUserContextProvider({ children }) {
  const [cookies, setCookies, removeCookies] = useCookies(['auth_token']);

  let initialUser = { isAuthenticated: false };

  if (cookies.auth_token) {
    const decodedToken = decode(cookies.auth_token);
    initialUser = { ...decodedToken.data, isAuthenticated: true }
  }
  //   const { loading, data } = useQuery(QUERY_CURRENT_USER, {
  //   variables: { email: initialUser.email }
  // })
  // console.log('data>>>>.', data)
  // const user = data?.getCurrentUser || []
  // console.log('cureentuserisChoreBuddy>>>>>', user.isChoreBuddy)
  // console.log(initialUser.email)
  const [currentUser, setCurrentUser] = useState(initialUser);

  const loginUser = useCallback((user, token) => {
    setCurrentUser({ ...user, isAuthenticated: true });
    setCookies('auth_token', token, { path: '/' });
  }, [setCurrentUser, setCookies]);

  const logoutUser = useCallback(() => {
    removeCookies('auth_token');
    setCurrentUser({ isAuthenticated: false });
    console.log('logged OUT')
  }, [setCurrentUser, removeCookies]);

  const isLoggedIn = useCallback(() => currentUser.isAuthenticated, [currentUser.isAuthenticated]);


  // console.log('data>>>>.', data)
  // const user = data?.getCurrentUser || []
  // console.log('cureentuserisChoreBuddy>>>>>', user.isChoreBuddy)

  const contextValue = useMemo(() =>
  ({
    currentUser,
    loginUser,
    logoutUser,
    isLoggedIn
  }),
    [currentUser, isLoggedIn, loginUser, logoutUser]);

    // console.log(currentUser)
  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}