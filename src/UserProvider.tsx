import React, { createContext, useContext } from "react";
import { personType, UserContextProviderType } from "./types";

const userContext = createContext<
  [personType, React.Dispatch<React.SetStateAction<personType>>] | null
>(null);

const UserProvider = (props: UserContextProviderType) => {
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
