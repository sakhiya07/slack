import React from "react";

import ProfilePicture from "./ProfilePicture";
import Modal from "./Modal";

import "../styles/_chatHeader.css";
import "../styles/_channelMembers.css";


import { useState, useEffect, useRef, KeyboardEvent } from "react";


import { groupLogo } from "../data";
import { ChannelType, ChatHeaderType, DirectMessageType, PersonType } from "../types";
import { getPersonName } from "../utils";

const ChatHeader = (props: ChatHeaderType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [registeredUsers, setRegisteredUsers] = useState<PersonType[]>([]); 
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => {
        return response.json();
      })
      .then(
        (data) =>
          (setRegisteredUsers(data.registeredUsers))
      );
  }, []);

  const chatType = props.currentChat.chatType;
  const chatData = props.currentChat.chatData;

  const handleRemoveMember = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget.id === (chatData as ChannelType).creator.id) {
      alert("You can't remove Creator of Group!!!");
      return;
    }
    let newMembers: PersonType[] = (chatData as ChannelType).members.filter((member) =>member.id !== event.currentTarget.id);
    let removedMember = (chatData as ChannelType).members.find((member) => {
      return member.id === event.currentTarget.id;
    });
    const newChatData: ChannelType = { ...chatData as ChannelType, members: newMembers };
    props.removeMember(newChatData, removedMember as PersonType);
    props.setCurrentChat({ chatType: "Channel", chatData: newChatData });
  };

  const handleAddMember = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    const newMember = registeredUsers.find(
      (user) => user.firstName + " " + user.lastName === name
    );
    if (!newMember) {
      alert("Please enter Register User");
      return;
    }

    const check = (chatData as ChannelType).members.find(
      (member) => member.id === newMember.id
    );
    if (check) {
      alert("User already in channel");
      return;
    }

    let newMembers: PersonType[] = [...(chatData as ChannelType).members, newMember];
    const newChatData: ChannelType = { ...chatData as ChannelType, members: newMembers };
    props.addMember(newChatData, newMember);
    props.setCurrentChat({ chatType: "Channel", chatData: newChatData });
    inputRef.current.value = "";
  };

  if (chatType === "Channel") {
    const { name } = chatData as ChannelType;
    return (
      <>
        <div className="chat-info">
          <div className="chat-logo">#</div>
          <div className="chat-name">{name}</div>
          <div className="channel-member">
            <img
              className="channel-member-logo"
              src={groupLogo}
              alt="group"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <div className="channel-members-modal">
            <div className="channel-members-modal-header">
              <div className="channel-members-modal-header-icon"> # </div>
              <div className="channel-members-modal-header-name">
                {name}
              </div>
            </div>
            <div
              className="channel-members-modal-searchbar"
              onKeyPress={handleAddMember}
            >
              <input
                type="text"
                placeholder="Add members"
                onChange={(event) => setName(event.target.value)}
                ref={inputRef}
              />
            </div>
            <div className="channel-members-modal-member-list">
              <h4> Members</h4>
              {(chatData as ChannelType).members.map((member) => {
                return (
                  <li className="channel-members-modal-member" key={member.id}>
                    <div className="channel-members-modal-member-image">
                      <img src={member.imgUrl} alt="" />
                    </div>
                    <div className="channel-members-modal-member-name">
                      {member.firstName} {member.lastName}
                    </div>
                    <div
                      className="channel-members-modal-member-removebutton"
                      id={member.id}
                      onClick={handleRemoveMember}
                    >
                      remove
                    </div>
                  </li>
                );
              })}
            </div>
          </div>
        </Modal>
      </>
    );
  } else {
    const { receiver } = chatData as DirectMessageType;
    return (
      <div className="chat-info">
        <ProfilePicture size={24} src={receiver.imgUrl} />
        <div className="chat-name">{getPersonName(receiver)}</div>
      </div>
    );
  }
};

export default React.memo(ChatHeader);
