/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import "../styles/_channels.css";
import Channel from "./Channel";
import { ChannelType, ChannelsListPropsType, PersonType } from "../types";
import { useUser } from "../UserProvider";
import Modal from "./Modal";
import NewChannelPopUp from "./NewChannelPopUp";

const ChannelsList = (props: ChannelsListPropsType) => {


  const [loggedUser] = useUser();

  const handleClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    const id = event.currentTarget.id;
    let channel = props.channels.find((channel) => channel.id === id);
    props.setCurrentChat({
      chatType: "Channel",
      chatData: channel as ChannelType,
    });
  },[props.currentChat]);

  const handleDeleteChannel = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
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
  }, [props.channels]);

  return (
  <>
   <div className="channel-list">
      <div className="channel-header">
        <div className="channel-title">Channels</div>
        <Modal content={(close) => <NewChannelPopUp close={close} addChannel={props.addChannel}/>}>
          {(open) => <div className="channel-plus-sign" onClick={open}>
              +
            </div>}
        </Modal>
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
  </>
  );
};

export default React.memo(ChannelsList);
