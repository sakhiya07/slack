import React from "react";
import { ChannelPropsType } from "../types";
import {} from "../utils";

const Channel = (props: ChannelPropsType) => {
  console.log("Rendered Channel");

  return (
    <li
      id={props.channel.id}
      onClick={props.handleClick}
      className={props.selected ? "selected" : ""}
    >
      <div className="channel-logo">#</div>
      <div className="channel-name">{props.channel.name}</div>
      <div
        className="channel-delete-icon"
        id={props.channel.id}
        onClick={props.handleDeleteChannel}
      >
        {" "}
        x{" "}
      </div>
    </li>
  );
};

export default React.memo(Channel);
