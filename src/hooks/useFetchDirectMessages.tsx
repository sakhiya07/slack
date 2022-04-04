import { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import { DirectMessageType, PersonType } from "../types";

export const useFetchDirectMessages = (): [
  DirectMessageType[],
  (newDirectMessage: DirectMessageType) => Promise<any>
] => {
  const [loggedUser] = useUser();
  const [directMessages, setDirectMessages] = useState<DirectMessageType[]>([]);

  useEffect(() => {
    const setIntervalId = setInterval(async () => {
      const response = await fetch(
        "http://localhost:3000/directMessages/?" +
          new URLSearchParams({
            userId: (loggedUser as PersonType).id,
          })
      );
      const data = await response.json();

      setDirectMessages(data.directMessages);
    }, 1000);
    return () => {
      clearInterval(setIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addDirectMessage = async (newDirectMessage: DirectMessageType) => {
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
      const response = await fetch("http://localhost:3000/newDirectMessage", requestOptions)
      const data = await response.json();
      console.log(data.directMessage);
      return data.directMessage;
    }
  };

  return [directMessages, addDirectMessage];
};
