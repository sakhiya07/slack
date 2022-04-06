import React from "react";

import ProfilePicture from "./ProfilePicture";
import ChannelMembers from "./ChannelMembers";
import Modal from "./Modal";

import "../styles/_chatHeader.css";

import { groupLogo } from "../data";
import { ChannelType, ChatHeaderType, DirectMessageType } from "../types";
import { getPersonName } from "../utils";

const ChatHeader = (props: ChatHeaderType) => {

  const chatType = props.currentChat.chatType;
  const chatData = props.currentChat.chatData;

  if (chatType === "Channel") {
    const { name } = chatData as ChannelType;
    return (
      <>
        <div className="chat-info">
          <div className="chat-logo">#</div>
          <div className="chat-name">{name}</div>
          <div className="channel-member">
            <Modal content={(close) => <ChannelMembers close={close} chatData={props.currentChat.chatData as ChannelType} addMember={props.addMember} removeMember={props.removeMember} setCurrentChat={props.setCurrentChat}/>}>
              {(open) => <img
                className="channel-member-logo"
                src={groupLogo}
                alt="group"
                onClick={open}/>}
            </Modal>
          </div>
        </div>
      </>
    );
  } else {
    const { receiver } = chatData as DirectMessageType;
    return (
      <div className="chat-info">
        <ProfilePicture size={24} src={receiver.imgUrl} />
        <div className="chat-name">{getPersonName(receiver)}</div>
      </div>
    );
  }
};

export default React.memo(ChatHeader);
