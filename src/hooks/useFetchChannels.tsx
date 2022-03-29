import { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import { channelType, personType } from "../types";

export const useFetchChannels = (): [
  channelType[],
  (newChannel: channelType) => void,
  (channel: channelType, member: personType) => void,
  (channel: channelType, member: personType) => void,
  (channel: channelType) => void
] => {
  const [loggedUser] = useUser();

  const [channels, setChannels] = useState<channelType[]>([]);

  useEffect(() => {
    const setIntervalId = setInterval(async () => {
      const response = await fetch(
        "http://localhost:3000/channels/?" +
          new URLSearchParams({
            userId: loggedUser.id,
          })
      );
      const data = await response.json();
      console.log(data);
      setChannels(data.channels);
    }, 1000);
    return () => {
      clearInterval(setIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addChannel = (newChannel: channelType) => {
    const body = {
      channel: newChannel,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3000/newChannel", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const addMember = (channel: channelType, member: personType) => {
    const body = {
      channel,
      member,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3000/addMember", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const removeMember = (channel: channelType, member: personType) => {
    const body = {
      channel,
      member,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3000/removeMember", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const removeChannel = (channel: channelType) => {
    const body = {
      channel,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3000/removeChannel", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return [channels, addChannel, addMember, removeMember, removeChannel];
};
