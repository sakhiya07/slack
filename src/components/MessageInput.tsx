import React, { useState, useRef, KeyboardEvent } from "react";
import { sendIcon } from "../data";
import "../styles/_messageInput.css";
import { MessageInputPropsType, MessageType, PersonType } from "../types";
import { useUser } from "../UserProvider";

const MessageInput = (props: MessageInputPropsType) => {
  const [loggedInUser] = useUser();
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null!);


  const sendMessage = () => {
    if(text === "") {
      alert("enter text");
      return;
    }
    const message: MessageType = {
      id: "",
      content: text,
      sender: loggedInUser as PersonType,
    };
    setText("");
    props.addMessage(message);
    inputRef.current.value = "";
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") sendMessage();
  };

  return (
    <div className="message-input">
      <input
        type="text"
        ref={inputRef}
        onChange={(event) => setText(event.target.value)}
        onKeyPress={handleEnter}
      />
      <img onClick={sendMessage} src={sendIcon} alt="" />
    </div>
  );
};

export default React.memo(MessageInput);
