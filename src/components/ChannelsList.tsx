import React, {useCallback} from "react";
import "../styles/_channels.css";
import "../styles/_newChannelPopUp.css";
import Channel from "./Channel";
import { useState } from "react";
import { ChannelType, ChannelsListPropslType, PersonType } from "../types";
import { useUser } from "../UserProvider";
import Modal from "./Modal";

const ChannelsList = (props: ChannelsListPropslType) => {

  const [channelName, setChannelName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [loggedUser] = useUser();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const id = event.currentTarget.id;
    let channel = props.channels.find((channel) => channel.id === id);
    props.setCurrentChat({
      chatType: "Channel",
      chatData: channel as ChannelType,
    });
  };

  const handleDeleteChannel = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const id = event.currentTarget.id;
    let channel = props.channels.find((channel) => channel.id === id);
    props.deleteChannel(channel as ChannelType);
    props.setCurrentChat({
      chatType: "DirectMessage",
      chatData: {
        id: (loggedUser as PersonType).id,
        receiver: loggedUser as PersonType,
      },
    });
  };;

  const createChannel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newChannel: ChannelType = {
      id: "",
      name: channelName,
      description: description,
      imgUrl: "#",
      creator: loggedUser as PersonType,
      members: [loggedUser as PersonType],
    };
    props.addChannel(newChannel);
    setIsOpen(false);
  };


  return (
  <>
   <div className="channel-list">
      <div className="channel-header">
        <div className="channel-title">Channels</div>
        <div className="channel-plus-sign" onClick={() => setIsOpen(true)}>
          +
        </div>
      </div>
      <ul className="channels">
        {props.channels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              channel={channel}
              selected={channel.id === props.currentChat.chatData.id}
              handleClick={handleClick}
              handleDeleteChannel={handleDeleteChannel}
            />
          );
        })}
      </ul>
    </div>
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <div className="new-channel-modal">
        <div className="new-channel-modal-titlebar">
          <h1 className="new-channel-modal-title">Create a channel</h1>
          <div
            className="new-channel-modal-close-button"
            onClick={() => setIsOpen(false)}
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
    </Modal>
  </>
  );
};

export default React.memo(ChannelsList);
