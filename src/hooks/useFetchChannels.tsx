import { useEffect, useState } from "react";
import { useUser } from "../UserProvider";
import { ChannelType, PersonType } from "../types";

export const useFetchChannels = (): [
  ChannelType[],
  (newChannel: ChannelType) => Promise<any>,
  (channel: ChannelType, member: PersonType) => void,
  (channel: ChannelType, member: PersonType) => void,
  (channel: ChannelType) => void
] => {
  let [loggedUser] = useUser();

  const [channels, setChannels] = useState<ChannelType[]>([]);

  useEffect(() => {
    const setIntervalId = setInterval(async () => {
      const response = await fetch(
        "http://localhost:3000/channels/?" +
          new URLSearchParams({
            userId: (loggedUser as PersonType).id,
          })
      );
      const data = await response.json();
      setChannels(data.channels);
    }, 1000);
    return () => {
      clearInterval(setIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addChannel = async (newChannel: ChannelType)  => {
    const body = {
      channel: newChannel,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    let response = await fetch("http://localhost:3000/newChannel", requestOptions);
    let data = await response.json();
    return data.channel;
  };

  const addMember = (channel: ChannelType, member: PersonType) => {
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

  const removeMember = (channel: ChannelType, member: PersonType) => {
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

  const removeChannel = (channel: ChannelType) => {
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
