import React from "react";
import "../styles/_sidebar.css";
import DirectMessagesList from "./DirectMessagesList";
import { sidebarPropsType } from "../types";
import ChannelsList from "./ChannelsList";

const Sidebar = (props: sidebarPropsType) => {
  console.log("Rendered sidebar");

  return (
    <div className="sidebar">
      <ChannelsList
        channels={props.channels}
        addChannel={props.addChannel}
        currentChat={props.currentChat}
        setCurrentChat={props.setCurrentChat}
        deleteChannel={props.deleteChannel}
      />
      <DirectMessagesList
        directMessages={props.directMessages}
        addDirectMessage={props.addDirectMessage}
        currentChat={props.currentChat}
        setCurrentChat={props.setCurrentChat}
      />
    </div>
  );
};

export default React.memo(Sidebar);
