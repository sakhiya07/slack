import "./App.css";
import Login from "./components/Login";

import Slack from "./components/Slack";

import { useMemo, useState, useCallback } from "react";

import { personType } from "./types";

import UserProvider from "./UserProvider";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<personType| undefined>();

  const loginUser = useCallback((user: personType) => {
    setLoggedInUser(user);
  }, [])

  const userProviderValue: [
    personType | undefined,
    React.Dispatch<React.SetStateAction<personType | undefined>>
  ] = useMemo(() => [loggedInUser, setLoggedInUser], [loggedInUser]);

  return (
    <div className="App">
      {!loggedInUser ? (
        <Login loginUser={loginUser} />
      ) : (
        <UserProvider value={userProviderValue}>
          <Slack />
        </UserProvider>
      )}
    </div>
  );
}

export default App;
