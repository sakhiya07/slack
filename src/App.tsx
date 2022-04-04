import "./App.css";
import Login from "./components/Login";

import Slack from "./components/Slack";

import { useMemo, useState, useCallback } from "react";

import { PersonType } from "./types";

import UserProvider from "./UserProvider";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<PersonType| undefined>();

  const loginUser = useCallback((user: PersonType) => {
    setLoggedInUser(user);
  }, [])

  const userProviderValue: [
    PersonType | undefined,
    React.Dispatch<React.SetStateAction<PersonType | undefined>>
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
