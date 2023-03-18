import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  email: null,
  token: null,
  login: () => {},
  logout: () => {}
});

export default AuthContext;