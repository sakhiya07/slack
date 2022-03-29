import {
  personType,
  ChannelsListPropslType,
  DirectMessagesListPropsType,
  DirectMessagePropsType,
  ChannelPropsType,
  channelType,
  directMessageType,
} from "./types";
import { PropsWithChildren } from "react";

export const getPersonName = (person: personType): string => {
  return person.firstName + " " + person.lastName;
};

export const getName = (Chat: {
  chatType: "channel" | "direct Message";
  chatData: channelType | directMessageType;
}): string => {
  let name;
  if (Chat.chatType === "channel") {
    let chatData = Chat.chatData as channelType;
    name = "Channel " + chatData.name;
  } else {
    let chatData = Chat.chatData as directMessageType;
    name = getPersonName(chatData.receiver);
  }
  return name;
};

// export function checkChannelsListProps(
//   prevProps: Readonly<PropsWithChildren<ChannelsListPropslType>>,
//   nextProps: Readonly<PropsWithChildren<ChannelsListPropslType>>
// ): boolean {
//   return (
//     prevProps.currentChat.chatType === nextProps.currentChat.chatType &&
//     nextProps.currentChat.chatType === "direct Message"
//   );
// }

// export function checkDirectMessagesListProps(
//   prevProps: Readonly<PropsWithChildren<DirectMessagesListPropsType>>,
//   nextProps: Readonly<PropsWithChildren<DirectMessagesListPropsType>>
// ): boolean {
//   return (
//     prevProps.currentChat.chatType === nextProps.currentChat.chatType &&
//     nextProps.currentChat.chatType === "channel"
//   );
// }

// export function checkChannelProp(
//   prevProps: Readonly<PropsWithChildren<ChannelPropsType>>,
//   nextProps: Readonly<PropsWithChildren<ChannelPropsType>>
// ): boolean {
//   return prevProps.selected === nextProps.selected;
// }

// export function checkDirectMessageProp(
//   prevProps: Readonly<PropsWithChildren<DirectMessagePropsType>>,
//   nextProps: Readonly<PropsWithChildren<DirectMessagePropsType>>
// ): boolean {
//   return prevProps.selected === nextProps.selected;
// }
