import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../styles/_newChatPopUp.css";

import {
  directMessageType,
  NewDirectMesssagePopUpPropsType,
  personType,
} from "../types";

import { getPersonName } from "../utils";

const portal = document.querySelector("#portal") as HTMLElement;

const NewDirectMessagePopUp = (props: NewDirectMesssagePopUpPropsType) => {
  const [name, setName] = useState<string>("");

  let registeredUsers = useRef<personType[]>(null!);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => {
        return response.json();
      })
      .then(
        (data) =>
          (registeredUsers.current = data.registredUsers as personType[])
      );
  }, []);

  const createDirectMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const receiver = registeredUsers.current.find((user) => {
      return getPersonName(user) === name;
    });

    if (!receiver) {
      alert("Enter Registered User");
      return;
    }
    const randomId = (Math.random() + 1).toString(36).substring(7);

    const newDirectMessage: directMessageType = {
      id: randomId,
      receiver: receiver,
    };

    props.addDirectMessage(newDirectMessage);
    props.onClose();
  };

  return createPortal(
    <>
      <div className="overlayed-container" onClick={props.onClose}></div>
      <div className="new-chat-modal">
        <div className="new-chat-modal-titlebar">
          <h3 className="new-chat-modal-title">Add Member</h3>
          <div className="new-chat-modal-close-button" onClick={props.onClose}>
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
    </>,
    portal
  );
};

export default NewDirectMessagePopUp;
