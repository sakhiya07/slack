import {  useState } from "react";
import { useUser } from "../UserProvider";
import { DirectMessageType, PersonType } from "../types";
import { useInterval } from "./useInterval";

const getDirectMessages = async (user: PersonType) => {
  const response = await fetch(
    "http://localhost:3000/directMessages/?" +
      new URLSearchParams({
        userId: (user as PersonType).id,
      })
  );
  const data = await response.json();
  return data.directMessages;
}

const postDirectMessage = async (user: PersonType, directMessage: DirectMessageType) => {
  const body = {
    sender: user,
    receiver: directMessage.receiver,
    id: directMessage.id,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch("http://localhost:3000/newDirectMessage", requestOptions)
  const data = await response.json();
  return data.directMessage;
}

export const useFetchDirectMessages = (): [DirectMessageType[], (newDirectMessage: DirectMessageType) => Promise<any>] => {
  const [loggedUser] = useUser();
  const [directMessages, setDirectMessages] = useState<DirectMessageType[]>([]);

  useInterval(async() => {
   const response =  await getDirectMessages(loggedUser as PersonType);
   setDirectMessages(response);
  }, 1000)

  const addDirectMessage = async (newDirectMessage: DirectMessageType) => {
    let alreadyExistDirectMessage = directMessages.find(
      (existingDirectMessage) =>
        existingDirectMessage.receiver.id === newDirectMessage.receiver.id
    );
    if (!alreadyExistDirectMessage) {
       alreadyExistDirectMessage = await postDirectMessage(loggedUser as PersonType, newDirectMessage);
       setDirectMessages(prev => [...prev, alreadyExistDirectMessage as DirectMessageType]);
    }
    return alreadyExistDirectMessage;
  };

  return [directMessages, addDirectMessage];
};
