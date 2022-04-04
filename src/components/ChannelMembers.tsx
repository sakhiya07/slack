import React, { KeyboardEvent, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/_channelMembers.css";

import { ChannelMembersPropsType, ChannelType, PersonType } from "../types";

const portal = document.querySelector("#portal") as HTMLElement;

const ChannelMembers = (props: ChannelMembersPropsType) => {
  let registeredUsers = useRef<PersonType[]>(null!);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => {
        return response.json();
      })
      .then(
        (data) =>
          (registeredUsers.current = data.registredUsers as PersonType[])
      );
  }, []);

  const [name, setName] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null!);

  const handleRemoveMember = (event: React.MouseEvent<HTMLDivElement>) => {
    let newMembers: PersonType[] = [];
    if (event.currentTarget.id === props.chatData.creator.id) {
      alert("You can't remove Creator of Group!!!");
      return;
    }
    props.chatData.members.forEach((member) => {
      if (member.id !== event.currentTarget.id) {
        newMembers.push(member);
      }
    });
    let removedMember = props.chatData.members.find((member) => {
      return member.id === event.currentTarget.id;
    });
    const newChatData: ChannelType = { ...props.chatData, members: newMembers };
    props.removeMember(newChatData, removedMember as PersonType);
    props.setCurrentChat({ chatType: "Channel", chatData: newChatData });
  };

  const handleAddMember = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;

    const newMember = registeredUsers.current.find(
      (user) => user.firstName + " " + user.lastName === name
    );

    if (!newMember) {
      alert("Plase enter Register User");
      return;
    }

    const check = props.chatData.members.find(
      (member) => member.id === newMember.id
    );

    if (check) {
      alert("User already in channel");
      return;
    }

    let newMembers: PersonType[] = [...props.chatData.members, newMember];
    const newChatData: ChannelType = { ...props.chatData, members: newMembers };
    props.addMember(newChatData, newMember);
    props.setCurrentChat({ chatType: "Channel", chatData: newChatData });
    inputRef.current.value = "";
  };

  return createPortal(
    <>
      <div className="overlayed-container" onClick={props.onClose}></div>
      <div className="channel-members-modal">
        <div className="channel-members-modal-header">
          <div className="channel-members-modal-header-icon"> # </div>
          <div className="channel-members-modal-header-name">
            {props.chatData.name}
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
          {props.chatData.members.map((member) => {
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
    </>,
    portal
  );
};

export default ChannelMembers;
