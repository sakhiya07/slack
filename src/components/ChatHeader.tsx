import React from "react";
import ProfilePicture from "./ProfilePicture";
import "../styles/_chatHeader.css";
import { useState } from "react";
import ChannelMembers from "./ChannelMembers";
import { groupLogo } from "../data";
import { channelType, ChatHeaderType, directMessageType } from "../types";
import { getPersonName } from "../utils";

const ChatHeader = (props: ChatHeaderType) => {

  const [isOpenMemberList, setIsOpenMemberList] = useState<boolean>(false);
  const chatType = props.currentChat.chatType;
  const chatData = props.currentChat.chatData;

  if (chatType === "channel") {
    const { name } = chatData as channelType;
    return (
      <div className="chat-info">
        <div className="chat-logo">#</div>
        <div className="chat-name">{name}</div>
        <div className="channel-member">
          <img
            className="channel-member-logo"
            src={groupLogo}
            alt="group"
            onClick={() => setIsOpenMemberList(true)}
          />
        </div>
        {isOpenMemberList ? (
          <ChannelMembers
            onClose={() => setIsOpenMemberList(false)}
            chatData={chatData as channelType}
            addMember={props.addMember}
            removeMember={props.removeMember}
            setCurrentChat={props.setCurrentChat}
          />
        ) : null}
      </div>
    );
  } else {
    const { receiver } = chatData as directMessageType;
    return (
      <div className="chat-info">
        <ProfilePicture size={24} src={receiver.imgUrl} />
        <div className="chat-name">{getPersonName(receiver)}</div>
      </div>
    );
  }
};

export default React.memo(ChatHeader);
