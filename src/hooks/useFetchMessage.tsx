import { useState, useEffect } from "react";
import { messageType } from "../types";

export const useFetchMessage = (
  chatId: string
): [messageType[], (message: messageType) => void] => {
  const [messages, setMessages] = useState<messageType[]>([]);
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

  const addMessage = (message: messageType) => {
    const body = {
      chatId,
      message,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3000/addmessage", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return [messages, addMessage];
};



// const content = (close) => {
//   <NewDirectMessagePopUp onClose={close}/>
// }

// <Modal content={content}>

//  {({open, isOpen}) => {
// <button onClick={open}/>
// }}


// </Modal>