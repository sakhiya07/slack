import React from "react";
import { DirectMessagePropsType } from "../types";
import { getPersonName } from "../utils";
import ProfilePicture from "./ProfilePicture";

const Channel = (props: DirectMessagePropsType) => {

  return (
    <li
      id={props.directMessage.id}
      onClick={props.handleClick}
      className={props.selected ? "selected" : ""}
    >
      <ProfilePicture size={24} src={props.directMessage.receiver.imgUrl} />
      <div className="chat-name">
        {getPersonName(props.directMessage.receiver)}
      </div>
    </li>
  );
};

export default React.memo(Channel);
