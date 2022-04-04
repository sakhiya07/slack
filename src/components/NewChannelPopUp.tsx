import React from "react";
import { createPortal } from "react-dom";
import "../styles/_newChannelPopUp.css";
import { useState } from "react";

import { channelType, personType } from "../types";
import { useUser } from "../UserProvider";

import { NewChannelPopUpPropsType } from "../types";

const portal = document.querySelector("#portal") as HTMLElement;

const NewChannelPopUp = (props: NewChannelPopUpPropsType) => {
  const [channelName, setChannelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loggedUser] = useUser();

  const createChannel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newChannel: channelType = {
      id: "",
      name: channelName,
      description: description,
      imgUrl: "#",
      creator: loggedUser as personType,
      members: [loggedUser as personType],
    };

    props.addChannel(newChannel);
    props.onClose();
  };

  return createPortal(
    <>
      <div className="overlayed-container" onClick={props.onClose}></div>
      <div className="new-channel-modal">
        <div className="new-channel-modal-titlebar">
          <h1 className="new-channel-modal-title">Create a channel</h1>
          <div
            className="new-channel-modal-close-button"
            onClick={props.onClose}
          >
            X
          </div>
        </div>
        <div className="new-channel-modal-form-container">
          <form onSubmit={createChannel}>
            <label htmlFor="channelName"> Name </label>
            <input
              id="channelName"
              name="channelName"
              type="text"
              placeholder="Channel Name"
              onChange={(event) => setChannelName(event.target.value)}
            />
            <label htmlFor="description"> Description (optional) </label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className="align-right-button">
              <button type="submit"> Create </button>
            </div>
          </form>
        </div>
      </div>
    </>,
    portal
  );
};

export default NewChannelPopUp;
