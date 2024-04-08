import { createContext, useState } from "react";
import { GetCookie } from "../hooks/cookies";

const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(GetCookie("User") || "false") || {}
  );

  return (
    <appContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default appContext;
