import React from "react";

import "../styles/_newChatPopUp.css";
import "../styles/_directMessages.css";

import DirectMessage from "./DirectMessage";
import Modal from "./Modal";

import { DirectMessagesListPropsType, DirectMessageType, PersonType } from "../types";
import { useState, useEffect } from "react";


import { getPersonName } from "../utils";


const DirectMessagesList = (props: DirectMessagesListPropsType) => {

  const [name, setName] = useState<string>("");

  const [registeredUsers, setRegisteredUsers] = useState<PersonType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => {
        return response.json();
      })
      .then(
        (data) =>
          (setRegisteredUsers(data.registeredUsers))
      );
  }, []);


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

  const createDirectMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(registeredUsers);
    const receiver = registeredUsers.find((user) => {
      return getPersonName(user) === name;
    });
    if (!receiver) {
      alert("Enter Registered User");
      return;
    }
    const newDirectMessage: DirectMessageType = {
      id: "",
      receiver: receiver,
    };
    props.addDirectMessage(newDirectMessage);
    setIsOpen(false);
  };


  return (
  <>
    <div className="chat-list">
      <div className="chat-header">
        <div className="chat-title">Direct Messages</div>
        <div
          className="chat-plus-sign"
          onClick={() => setIsOpen(true)}
        >
          +
        </div>
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
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
    <div className="new-chat-modal">
        <div className="new-chat-modal-titlebar">
          <h3 className="new-chat-modal-title">Add Member</h3>
          <div className="new-chat-modal-close-button" onClick={() => setIsOpen(false)}>
            X
          </div>
        </div>
        <div className="new-chat-modal-form-container">
          <form onSubmit={createDirectMessage}>
            <label htmlFor="chatName"> Name </label>
            <input
              id="chatName"
              name="chatName"
              type="text"
              placeholder="Member Name"
              onChange={(event) => setName(event.target.value)}
            />

            <div className="align-center-button">
              <button type="submit"> Add </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </>
  );
};

export default React.memo(DirectMessagesList);
