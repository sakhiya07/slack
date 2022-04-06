import React from "react";

import "../styles/_directMessages.css";

import DirectMessage from "./DirectMessage";

import Modal from "./Modal";

import { DirectMessagesListPropsType, DirectMessageType } from "../types";

import NewDirectMessagePopUp from "./NewDirectMessagePopUp";

const DirectMessagesList = (props: DirectMessagesListPropsType) => {


  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const id = event.currentTarget.id;
    if (id === props.currentChat.chatData.id) {
      return;
    }
    let directMessage = props.directMessages.find(
      (directMessage) => directMessage.id === id
    );
    props.setCurrentChat({
      chatType: "DirectMessage",
      chatData: directMessage as DirectMessageType,
    });
  };


  return (
  <>
    <div className="chat-list">
      <div className="chat-header">
        <div className="chat-title">Direct Messages</div>
        <Modal content={(close) => <NewDirectMessagePopUp close={close} addDirectMessage={props.addDirectMessage}/>}>
          {(open) => <div
            className="chat-plus-sign"
            onClick={open}
          >
            +
          </div>}
        </Modal>
      </div>
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
  </>
  );
};

export default React.memo(DirectMessagesList);
