import React from "react";
import "../styles/_profilePicture.css";

type ProfilePictureTypes = {
  size: number;
  src: string;
};

const getStyle = (size: number) => {
  return {
    width: size,
    height: size,
  };
};

const ProfilePicture = (props: ProfilePictureTypes) => {
  console.log("rendered profile picture");

  const IMG_STYLE = getStyle(props.size);
  return (
    <div className="profile-picture">
      <img src={props.src} alt="" style={IMG_STYLE} />
    </div>
  );
};

export default React.memo(ProfilePicture);
