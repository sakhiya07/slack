import React, { createContext, useContext } from "react";
import { personType, UserProviderType } from "./types";

const userContext = createContext<
  [personType | undefined, React.Dispatch<React.SetStateAction<personType | undefined>>] | null
>(null);

const UserProvider = (props: UserProviderType) => {
  console.log("rerendered UserProvider");

  return <userContext.Provider {...props} />;
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
