import React from "react";
import ProfilePicture from "./ProfilePicture";
import "../styles/_header.css";
import { useUser } from "../UserProvider";
import { PersonType } from "../types";
import Modal from "./Modal";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [loggedInUser] = useUser();

  return (
    <div className="header">
      <Modal content={(close) => <ProfileMenu close={close}/>} >
       {(open) => <div
          className="profile-picture-header"
          onClick={open} >
          <ProfilePicture size={30} src={(loggedInUser as PersonType).imgUrl} />
        </div>
       }
      </Modal>
    
    </div>

  );
};

export default React.memo(Header);
