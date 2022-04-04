import React from "react";
import "../styles/_directMessages.css";
import { useState } from "react";
import NewDirectMessagePopUp from "./NewDirectMessagePopUp";
import DirectMessage from "./DirectMessage";

import { DirectMessagesListPropsType, directMessageType } from "../types";

// import { checkDirectMessagesListProps } from "../utils";

const DirectMessagesList = (props: DirectMessagesListPropsType) => {

  const [isOpenNewDirectMessage, setIsOpenNewDirectMessage] =
    useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const id = event.currentTarget.id;
    if (id === props.currentChat.chatData.id) {
      return;
    }
    let directMessage = props.directMessages.find(
      (directMessage) => directMessage.id === id
    );
    props.setCurrentChat({
      chatType: "direct Message",
      chatData: directMessage as directMessageType,
    });
  };

  return (
    <div className="chat-list">
      <div className="chat-header">
        <div className="chat-title">Direct Messages</div>
        <div
          className="chat-plus-sign"
          onClick={() => setIsOpenNewDirectMessage(true)}
        >
          +
        </div>
      </div>
      {isOpenNewDirectMessage ? (
        <NewDirectMessagePopUp
          onClose={() => setIsOpenNewDirectMessage(false)}
          addDirectMessage={props.addDirectMessage}
        />
      ) : null}
      <ul className="chats">
        {props.directMessages.map((directMessage) => {
          return (
            <DirectMessage
              key={directMessage.id}
              directMessage={directMessage}
              handleClick={handleClick}
              selected={directMessage.id === props.currentChat.chatData.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(DirectMessagesList);
