import { useState, useEffect } from "react";
import { MessageType } from "../types";

export const useFetchMessage = (
  chatId: string
): [MessageType[], (message: MessageType) => void] => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    const setIntervalId = setInterval(async () => {
      const response = await fetch(
        "http://localhost:3000/messages/?" +
          new URLSearchParams({
            chatId: chatId,
          })
      );
      const data = await response.json();
      if (!data.messages) data.messages = [];
      setMessages(data.messages);
    }, 500);
    return () => {
      clearInterval(setIntervalId);
    };
  }, [chatId]);

  const addMessage = (message: MessageType) => {
    const body = {
      chatId,
      message,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3000/addMessage", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return [messages, addMessage];
};

