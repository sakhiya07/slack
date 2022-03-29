import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";

import { useFetchDirectMessages } from "../hooks/useFetchDirectMessages";

import { useState } from "react";

import { useUser } from "../UserProvider";

import { channelType, chatType, directMessageType } from "../types";
import { useFetchChannels } from "../hooks/useFetchChannels";

const Slack = () => {
  const [loggedInUser] = useUser();

  const chatSelfData: directMessageType = {
    id: loggedInUser.id,
    receiver: loggedInUser,
  };

  const [currentChat, setCurrentChat] = useState<chatType>({
    chatType: "direct Message",
    chatData: chatSelfData,
  });

  const [channels, addChannel, addMember, removeMember, deleteChannel] =
    useFetchChannels();

  const [directMessages, addDirectMessage] = useFetchDirectMessages();

  console.log("Rendered Slack App");

  const handleAddChannel = (newChannel: channelType) => {
    addChannel(newChannel);
    setCurrentChat({
      chatType: "channel",
      chatData: newChannel,
    });
  };

  const handleAddDirectMessage = (newDirectMessage: directMessageType) => {
    addDirectMessage(newDirectMessage);
    setCurrentChat({
      chatType: "direct Message",
      chatData: newDirectMessage as directMessageType,
    });
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar
          channels={channels}
          addChannel={handleAddChannel}
          directMessages={directMessages}
          addDirectMessage={handleAddDirectMessage}
          deleteChannel={deleteChannel}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
        <div className="chat-container">
          <ChatHeader
            addMember={addMember}
            removeMember={removeMember}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
          <Messages currentChat={currentChat} />
        </div>
      </div>
    </>
  );
};

export default React.memo(Slack);
