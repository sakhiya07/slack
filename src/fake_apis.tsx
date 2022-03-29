export const loginUser = {
  id: "Yagnik Sakhiya",
  name: "Yagnik Sakhiya",
  username: "Sakhiya07",
  password: "Slack-devmode",
};

type channelType = {
  id: string;
  name: string;
  description: string;
};

type userType = {
  id: string;
  name: string;
  username: string;
  password: string;
};

const channels: channelType[] = [];
const users: userType[] = [loginUser];

const addChannel = (channel: channelType): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      channels.push(channel);
      resolve("Added Channel Successfully!!!");
    }, 300);
  });
};

const addUser = (user: userType): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      users.push(user);
      resolve("Added User Successfully!!!");
    }, 300);
  });
};

const getLoginUser = (): Promise<userType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(loginUser);
    }, 300);
  });
};

const getChannel = (id: string): Promise<channelType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const channel = channels.find((channel) => channel.id === id);
      if (channel) resolve(channel);
      else reject("Could not find channel with" + { id } + ".");
    }, 300);
  });
};

const getUser = (id: string): Promise<userType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const directMessageUser = users.find((user) => user.id === id);
      if (directMessageUser) resolve(directMessageUser);
      else reject("Could not find user with" + { id } + ".");
    }, 300);
  });
};
