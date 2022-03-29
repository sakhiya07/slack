import "./App.css";
import Login from "./components/Login";

import Slack from "./components/Slack";

import { useMemo, useState } from "react";

import { personType } from "./types";

import UserProvider from "./UserProvider";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<personType>(
    {} as personType
  );

  const loginUser = (user: personType) => {
    setLoggedInUser(user);
  };

  const userProviderValue: [
    personType,
    React.Dispatch<React.SetStateAction<personType>>
  ] = useMemo(() => [loggedInUser, setLoggedInUser], [loggedInUser]);

  return (
    <div className="App">
      {!loggedInUser.hasOwnProperty("userName") ? (
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
