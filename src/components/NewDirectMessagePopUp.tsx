import { useState } from "react";
import "../styles/_newChatPopUp.css";
import {
  DirectMessageType,
  NewDirectMessagePopUpPropsType,
  PersonType,
} from "../types";

import { getPersonName, getRegisteredUsers } from "../utils";


const NewDirectMessagePopUp = (props: NewDirectMessagePopUpPropsType) => {
  const [name, setName] = useState<string>("");
  const createDirectMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registeredUsers: PersonType[] = await getRegisteredUsers();
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
    props.close();
  };

  return (
      <div className="new-chat-modal">
        <div className="new-chat-modal-titlebar">
          <h3 className="new-chat-modal-title">Add Member</h3>
          <div className="new-chat-modal-close-button" onClick={props.close}>
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
  );
};

export default NewDirectMessagePopUp;