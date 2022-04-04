import React, { createContext, useContext } from "react";
import { PersonType, UserProviderType } from "./types";

const userContext = createContext<
  [PersonType | undefined, React.Dispatch<React.SetStateAction<PersonType | undefined>>] | null
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
