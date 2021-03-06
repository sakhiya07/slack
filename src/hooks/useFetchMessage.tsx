import { useState } from "react";
import { MessageType } from "../types";
import { useInterval } from "./useInterval";

const getMessages = async (chatId: string) => {
  const response = await fetch("http://localhost:3000/messages/?" +
    new URLSearchParams({
      chatId: chatId,
    }));
  const data = await response.json();

  if (!data.messages) return [];
  return data.messages;
}

const postMessage = async (chatId: string, message: MessageType) => {
  const body = {
    chatId,
    message,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch("http://localhost:3000/addMessage", requestOptions);
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    throw error;
  }
}

export const useFetchMessage = (chatId: string): [MessageType[], (message: MessageType) => void] => {
  
  const [messages, setMessages] = useState<MessageType[]>([]);

  useInterval(async() => {
    const response = await getMessages(chatId);
    setMessages(response);
  }, 1000)

  const addMessage = async (message: MessageType) => {
    setMessages(messages => [message, ...messages]);
    try {
      await postMessage(chatId, message);
    } catch(error) {
      setMessages(messages);
      console.log(error);
    }
  };

  return [messages, addMessage];
};

