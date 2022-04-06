export type MessageType = {
  id: string;
  sender: PersonType;
  content: string;
};

export type ChannelType = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  creator: PersonType;
  members: PersonType[];
};

export type DirectMessageType = {
  id: string;
  receiver: PersonType;
};

export type PersonType = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  imgUrl: string;
};

export type ProfileMenuPropsType = {
  close: () => void;
};

export type LoginPropsType = {
  loginUser: (user: PersonType) => void;
};

export type UserProviderType = {
  value: [PersonType | undefined, React.Dispatch<React.SetStateAction<PersonType | undefined>>];
  children: React.ReactNode;
};

export type ChatType = {
  chatType: "DirectMessage" | "Channel";
  chatData: DirectMessageType | ChannelType;
};

export type ChatHeaderType = {
  currentChat: ChatType;
  addMember: (channel: ChannelType, member: PersonType) => void;
  removeMember: (channel: ChannelType, member: PersonType) => void;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatType>>;
};

export type SidebarPropsType = {
  addChannel: (channel: ChannelType) => void;
  channels: ChannelType[];
  directMessages: DirectMessageType[];
  addDirectMessage: (directMessage: DirectMessageType) => void;
  currentChat: ChatType;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatType>>;
  deleteChannel: (channel: ChannelType) => void;
};

export type ChannelsListPropsType = {
  channels: ChannelType[];
  addChannel: (channel: ChannelType) => void;
  currentChat: ChatType;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatType>>;
  deleteChannel: (channel: ChannelType) => void;
};

export type DirectMessagesListPropsType = {
  directMessages: DirectMessageType[];
  addDirectMessage: (directMessage: DirectMessageType) => void;
  currentChat: ChatType;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatType>>;
};

export type ChannelMembersPropsType = {
  close: () => void;
  chatData: ChannelType;
  addMember: (channel: ChannelType, member: PersonType) => void;
  removeMember: (channel: ChannelType, member: PersonType) => void;
  setCurrentChat: React.Dispatch<React.SetStateAction<ChatType>>;
};

export type NewChannelPopUpPropsType = {
  close: () => void;
  addChannel: (channel: ChannelType) => void;
};

export type NewDirectMessagePopUpPropsType = {
  close: () => void;
  addDirectMessage: (channel: DirectMessageType) => void;
};

export type MessagesPropsType = {
  currentChat: ChatType;
};

export type MessageInputPropsType = {
  addMessage: (message: MessageType) => void;
};

export type ChannelPropsType = {
  channel: ChannelType;
  selected: boolean;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  handleDeleteChannel: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export type DirectMessagePropsType = {
  directMessage: DirectMessageType;
  selected: boolean;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
};



export type ModalPropsType = {
  content: (fn:() => void) => JSX.Element
  children: (fn:() => void) => JSX.Element
}