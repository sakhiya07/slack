import { useState } from "react";
import { useUser } from "../UserProvider";
import { ChannelType, PersonType } from "../types";
import { useInterval } from "./useInterval";

const fetchChannels = async (user: PersonType) => {
  const response = await fetch(
    "http://localhost:3000/channels/?" +
      new URLSearchParams({
        userId: (user as PersonType).id,
      })
  );
  const data = await response.json();
  return data.channels; 
}

const postChannel = async (channel: ChannelType) => {
  const body = {
    channel
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  let response = await fetch("http://localhost:3000/newChannel", requestOptions);
  let data = await response.json();
  return data.channel;
}

const deleteChannel = async (channel: ChannelType) => {
  const body = {
    channel,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response =  await fetch("http://localhost:3000/removeChannel", requestOptions);
  const data = await response.json();
  console.log(data);
}

const postMember = async (channel: ChannelType, member: PersonType) => {
  const body = {
    channel,
    member,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch("http://localhost:3000/addMember", requestOptions);
  const data = await response.json();
  console.log(data);
}

const deleteMember = async (channel: ChannelType, member: PersonType) => {
  const body = {
    channel,
    member,
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch("http://localhost:3000/removeMember", requestOptions);
  const data = await response.json();
  console.log(data);
    
}

export const useFetchChannels = (): [
  ChannelType[],
  (newChannel: ChannelType) => Promise<any>,
  (channel: ChannelType, member: PersonType) => void,
  (channel: ChannelType, member: PersonType) => void,
  (channel: ChannelType) => void
] => {

  let [loggedUser] = useUser();
  const [channels, setChannels] = useState<ChannelType[]>([]);

  useInterval(async () => {
    const response = await fetchChannels(loggedUser as PersonType);
    setChannels(response);
  }, 1000);

  const addChannel = async (newChannel: ChannelType)  => {
    const channel = await postChannel(newChannel);
    setChannels(prev => [...prev, channel]);
    return channel;
  };

  const removeChannel = (channel: ChannelType) => {
     deleteChannel(channel);
  };

  const addMember = (channel: ChannelType, member: PersonType) => {
    postMember(channel, member);
  };

  const removeMember = (channel: ChannelType, member: PersonType) => {
    deleteMember(channel, member);
  };

  return [channels, addChannel, addMember, removeMember, removeChannel];
};
