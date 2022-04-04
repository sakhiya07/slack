import React from "react";
import { createPortal } from "react-dom";
import "../styles/_profileMenu.css";
import ProfilePicture from "./ProfilePicture";
import { personType, ProfileMenuPropsType } from "../types";
import { useUser } from "../UserProvider";
import { getPersonName } from "../utils";

const portal = document.querySelector("#portal") as HTMLElement;

const ProfileMenu = (props: ProfileMenuPropsType) => {
  const [loggedInUser, setLoggedInUser] = useUser();


  const perosnName = getPersonName(loggedInUser as personType);

  return createPortal(
    <>
      <div className="overlayed-container" onClick={props.onClose}></div>
      <div className="profile-menu-modal">
        <div className="profile-menu-detail">
          <ProfilePicture size={32} src={(loggedInUser as personType).imgUrl} />
          <div className="profile-menu-detail-name">{perosnName}</div>
        </div>
        <div
          className="profile-menu-signout"
          onClick={() => setLoggedInUser({} as personType)}
        >
          Sign Out
        </div>
      </div>
    </>,
    portal
  );
};

export default ProfileMenu;
