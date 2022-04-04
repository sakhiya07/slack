import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";

import { useFetchDirectMessages } from "../hooks/useFetchDirectMessages";
import { useFetchChannels } from "../hooks/useFetchChannels";

import { useState , useCallback} from "react";

import { useUser } from "../UserProvider";

import { ChannelType, ChatType, DirectMessageType, PersonType } from "../types";

const Slack = () => {
  const [loggedInUser] = useUser();

  const chatSelfData: DirectMessageType = {
    id: (loggedInUser as PersonType).id,
    receiver: loggedInUser as PersonType,
  };

  const [currentChat, setCurrentChat] = useState<ChatType>({
    chatType: "DirectMessage",
    chatData: chatSelfData,
  });

  const [channels, addChannel, addMember, removeMember, deleteChannel] =
    useFetchChannels();

  const [directMessages, addDirectMessage] = useFetchDirectMessages();


  const handleAddChannel = useCallback(async (newChannel: ChannelType) => {
    const addedChannel = await addChannel(newChannel);
    console.log(addedChannel);
    setCurrentChat({
      chatType: "Channel",
      chatData: addedChannel,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[channels])

  const handleAddDirectMessage = useCallback(async (newDirectMessage: DirectMessageType) => {
    const addedDirectMessage = await addDirectMessage(newDirectMessage);
    setCurrentChat({
      chatType: "DirectMessage",
      chatData: addedDirectMessage as DirectMessageType,
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
