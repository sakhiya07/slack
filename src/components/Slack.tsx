import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";

import { useFetchDirectMessages } from "../hooks/useFetchDirectMessages";
import { useFetchChannels } from "../hooks/useFetchChannels";

import { useState , useCallback} from "react";

import { useUser } from "../UserProvider";

import { channelType, chatType, directMessageType, personType } from "../types";

const Slack = () => {
  const [loggedInUser] = useUser();

  const chatSelfData: directMessageType = {
    id: (loggedInUser as personType).id,
    receiver: loggedInUser as personType,
  };

  const [currentChat, setCurrentChat] = useState<chatType>({
    chatType: "direct Message",
    chatData: chatSelfData,
  });

  const [channels, addChannel, addMember, removeMember, deleteChannel] =
    useFetchChannels();

  const [directMessages, addDirectMessage] = useFetchDirectMessages();


  const handleAddChannel = useCallback(async (newChannel: channelType) => {
    const addedChannel = await addChannel(newChannel);
    console.log(addedChannel);
    setCurrentChat({
      chatType: "channel",
      chatData: addedChannel,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[channels])

  const handleAddDirectMessage = useCallback(async (newDirectMessage: directMessageType) => {
    const addedDirectMessage = await addDirectMessage(newDirectMessage);
    setCurrentChat({
      chatType: "direct Message",
      chatData: addedDirectMessage as directMessageType,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[directMessages])

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
