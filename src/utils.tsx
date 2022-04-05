import {
  PersonType,
  ChannelType,
  DirectMessageType,
  ChatType
} from "./types";

export const getPersonName = (person: PersonType): string => {
  return person.firstName + " " + person.lastName;
};

export const getName = (Chat: ChatType): string => {
  let name;
  if (Chat.chatType === "Channel") {
    let chatData = Chat.chatData as ChannelType;
    name = "Channel " + chatData.name;
  } else {
    let chatData = Chat.chatData as DirectMessageType;
    name = getPersonName(chatData.receiver);
  }
  return name;
};

export const getRegisteredUsers = async () => {
  const response =  await fetch("http://localhost:3000/users")
  const data = await response.json();
  return data.registeredUsers;
}

