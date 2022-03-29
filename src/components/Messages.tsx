import React, { useRef } from "react";
import "../styles/_messages.css";
import MessageInput from "./MessageInput";

import { useFetchMessage } from "../hooks/useFetchMessage";

import { MessagesPropsType } from "../types";
import { getName } from "../utils";

const Messages = (props: MessagesPropsType) => {
  console.log("Rendered messages list");

  const [messages, addMessage] = useFetchMessage(props.currentChat.chatData.id);

  let name = getName(props.currentChat);

  const messagesEndRef = useRef<HTMLDivElement>(null!);
  const messagesRef = useRef<HTMLDivElement>(null!);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="messages" ref={messagesRef}>
        <div ref={messagesEndRef}></div>
        {messagesRef.current && messagesRef.current.scrollTop < 0 ? (
          <div className="scroll-bottom" onClick={scrollToBottom}>
            Scroll To Bottom
          </div>
        ) : null}
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <div className="message-sender-image">
              <img src={message.sender.imgUrl} alt="" />
            </div>
            <div className="message-sender-name-message">
              <div className="message-sender-name">
                {message.sender.firstName + " " + message.sender.lastName}
              </div>
              <span>{message.content}</span>
            </div>
          </div>
        ))}
        {messages.length === 0 ? (
          <div> Start conversation with {name}!!! </div>
        ) : null}
      </div>
      <MessageInput addMessage={addMessage} />
    </>
  );
};

export default React.memo(Messages);
