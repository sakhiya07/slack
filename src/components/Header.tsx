import React from "react";
import ProfilePicture from "./ProfilePicture";
import "../styles/_header.css";
import "../styles/_profileMenu.css";
import { useState } from "react";
import { useUser } from "../UserProvider";
import { PersonType } from "../types";
import { getPersonName } from "../utils";
import Modal from "./Modal";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useUser();


  const personName = getPersonName(loggedInUser as PersonType);

  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<boolean>(false);


  return (
    <div className="header">
      <div
        className="profile-picture-header"
        onClick={() => setIsOpenProfileMenu(true)}
      >
        <ProfilePicture size={30} src={(loggedInUser as PersonType).imgUrl} />
      </div>
      <Modal isOpen={isOpenProfileMenu} onRequestClose={() => setIsOpenProfileMenu(false)}>
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
      </Modal>
    </div>

  );
};

export default React.memo(Header);
