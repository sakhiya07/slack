import React from "react";
import ProfilePicture from "./ProfilePicture";
import "../styles/_header.css";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";
import { useUser } from "../UserProvider";
import { PersonType } from "../types";

const Header = () => {
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<boolean>(false);
  const [loggedInUser] = useUser();


  return (
    <div className="header">
      {isOpenProfileMenu ? (
        <ProfileMenu onClose={() => setIsOpenProfileMenu(false)} />
      ) : null}
      <div
        className="profile-picture-header"
        onClick={() => setIsOpenProfileMenu(true)}
      >
        <ProfilePicture size={30} src={(loggedInUser as PersonType).imgUrl} />
      </div>
    </div>
  );
};

export default React.memo(Header);
