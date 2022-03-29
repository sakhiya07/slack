import React from "react";
import "../styles/_channels.css";
import NewChannelPopUp from "./NewChannelPopUp";
import Channel from "./Channel";
import { useState } from "react";
import { channelType, ChannelsListPropslType } from "../types";
import { useUser } from "../UserProvider";

const ChannelsList = (props: ChannelsListPropslType) => {
  console.log("rendered channels");

  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const [loggedUser] = useUser();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const id = event.currentTarget.id;

    if (id === props.currentChat.chatData.id) {
      return;
    }

    let channel = props.channels.find((channel) => channel.id === id);
    if (!channel) {
      throw new Error("not exist channel selected how it is possible ");
    }
    props.setCurrentChat({
      chatType: "channel",
      chatData: channel as channelType,
    });
  };

  const handleDeleteChannel = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const id = event.currentTarget.id;

    let channel = props.channels.find((channel) => channel.id === id);

    props.deleteChannel(channel as channelType);

    props.setCurrentChat({
      chatType: "direct Message",
      chatData: {
        id: loggedUser.id,
        receiver: loggedUser,
      },
    });
  };

  return (
    <div className="channel-list">
      <div className="channel-header">
        <div className="channel-title">Channels</div>
        <div className="channel-plus-sign" onClick={() => setIsPopUpOpen(true)}>
          +
        </div>
      </div>
      {isPopUpOpen ? (
        <NewChannelPopUp
          onClose={() => setIsPopUpOpen(false)}
          addChannel={props.addChannel}
        />
      ) : null}

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
  );
};

export default React.memo(ChannelsList);
