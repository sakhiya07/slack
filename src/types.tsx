export type messageType = {
  id: string;
  sender: personType;
  content: string;
};

export type channelType = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  creator: personType;
  members: personType[];
};

export type directMessageType = {
  id: string;
  receiver: personType;
};

export type personType = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  imgUrl: string;
};

export type ProfileMenuPropsType = {
  onClose: () => void;
};

export type LoginPropsType = {
  loginUser: (user: personType) => void;
};

export type UserProviderType = {
  value: [personType | undefined, React.Dispatch<React.SetStateAction<personType | undefined>>];
  children: React.ReactNode;
};

export type chatType = {
  chatType: "direct Message" | "channel";
  chatData: directMessageType | channelType;
};

export type ChatHeaderType = {
  currentChat: chatType;
  addMember: (channel: channelType, member: personType) => void;
  removeMember: (channel: channelType, member: personType) => void;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
};

export type sidebarPropsType = {
  addChannel: (channel: channelType) => void;
  channels: channelType[];
  directMessages: directMessageType[];
  addDirectMessage: (directMessage: directMessageType) => void;
  currentChat: chatType;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
  deleteChannel: (channel: channelType) => void;
};

export type ChannelsListPropslType = {
  channels: channelType[];
  addChannel: (channel: channelType) => void;
  currentChat: chatType;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
  deleteChannel: (channel: channelType) => void;
};

export type DirectMessagesListPropsType = {
  directMessages: directMessageType[];
  addDirectMessage: (directMessage: directMessageType) => void;
  currentChat: chatType;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
};

export type ChannelMembersPropsType = {
  onClose: () => void;
  chatData: channelType;
  addMember: (channel: channelType, member: personType) => void;
  removeMember: (channel: channelType, member: personType) => void;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
};

export type NewChannelPopUpPropsType = {
  onClose: () => void;
  addChannel: (channel: channelType) => void;
};

export type NewDirectMesssagePopUpPropsType = {
  onClose: () => void;
  addDirectMessage: (channel: directMessageType) => void;
};

export type MessagesPropsType = {
  currentChat: chatType;
};

export type MessageInputPropsType = {
  addMessage: (message: messageType) => void;
};

export type ChannelPropsType = {
  channel: channelType;
  selected: boolean;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  handleDeleteChannel: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export type DirectMessagePropsType = {
  directMessage: directMessageType;
  selected: boolean;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
};
