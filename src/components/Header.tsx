import React from "react";
import ProfilePicture from "./ProfilePicture";
import "../styles/_header.css";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";
import { useUser } from "../UserProvider";

const Header = () => {
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<boolean>(false);
  const [loggedInUser] = useUser();

  console.log("rendered header!!!");

  return (
    <div className="header">
      {isOpenProfileMenu ? (
        <ProfileMenu onClose={() => setIsOpenProfileMenu(false)} />
      ) : null}
      <div
        className="profile-picture-header"
        onClick={() => setIsOpenProfileMenu(true)}
      >
        <ProfilePicture size={30} src={loggedInUser.imgUrl} />
      </div>
    </div>
  );
};

export default React.memo(Header);
