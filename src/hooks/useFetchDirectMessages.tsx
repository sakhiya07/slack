import { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import { directMessageType } from "../types";

export const useFetchDirectMessages = (): [
  directMessageType[],
  (newDirectMessage: directMessageType) => void
] => {
  const [loggedUser] = useUser();
  const [directMessages, setDirectMessages] = useState<directMessageType[]>([]);

  useEffect(() => {
    const setIntervalId = setInterval(async () => {
      const response = await fetch(
        "http://localhost:3000/directMessages/?" +
          new URLSearchParams({
            userId: loggedUser.id,
          })
      );
      const data = await response.json();
      console.log(data);

      setDirectMessages(data.directMessages);
    }, 1000);
    return () => {
      clearInterval(setIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addDirectMessage = (newDirectMessage: directMessageType) => {
    let alreadyExistDirectMessage = directMessages.find(
      (existingDirectMessage) =>
        existingDirectMessage.receiver.id === newDirectMessage.receiver.id
    );

    if (!alreadyExistDirectMessage) {
      const body = {
        sender: loggedUser,
        receiver: newDirectMessage.receiver,
        id: newDirectMessage.id,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      fetch("http://localhost:3000/newDirectMessage", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  return [directMessages, addDirectMessage];
};
