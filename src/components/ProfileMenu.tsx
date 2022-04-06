import React from "react";
import "../styles/_profileMenu.css";
import ProfilePicture from "./ProfilePicture";
import { PersonType, ProfileMenuPropsType } from "../types";
import { useUser } from "../UserProvider";
import { getPersonName } from "../utils";


const ProfileMenu = (props: ProfileMenuPropsType) => {
  const [loggedInUser, setLoggedInUser] = useUser();
  
  const personName = getPersonName(loggedInUser as PersonType);

  return (
    <div className="profile-menu-modal">
      <div className="profile-menu-detail">
        <ProfilePicture size={32} src={(loggedInUser as PersonType).imgUrl} />
        <div className="profile-menu-detail-name">{personName}</div>
      </div>
      <div
        className="profile-menu-signout"
        onClick={() => setLoggedInUser(undefined)}
      >
        Sign Out
      </div>
    </div>
  );
};

export default ProfileMenu;