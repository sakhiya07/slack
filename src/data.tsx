import { personType, messageType } from "./types";

export const groupLogo: string =
  "https://media.istockphoto.com/vectors/user-group-icon-logo-vector-id1276165275?k=20&m=1276165275&s=170667a&w=0&h=iYb8qrZvkioQcGyhingENwifab5IelwGkSRvFNMHgRY=";
export const src: string =
  "https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png";
export const sendIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMoAAAD5CAMAAABRVVqZAAAAgVBMVEX39/cAAAD////7+/v29vbv7+94eHi/v7/FxcXy8vLr6+vR0dG0tLRhYWHKysra2tpSUlLj4+OdnZ2JiYlaWlpKSko6Ojqtra2mpqaXl5eAgIDm5uZqamrc3NwVFRVxcXFAQECQkJAhISEpKSkyMjIPDw8mJiY8PDwaGhpMTEyGhobJsYcLAAAEuUlEQVR4nO2diVIiQRBEqW5QwQsV7/vA6/8/cCVYFzlmJjfCgHo1nV9AhoFU1quq7nSKioqKioo2qbzpD/Bryntp0x/hl5RGdhLCS84fZrYVwEvuvNlEN3gvuf9iU40S+8ufe0/2rdNM9pIHY5vprMv1ko9sTs89qpd0aAu6GzC9pN1FJ186InpJByucmB3y/imn7ZVOzHZpXtJehROzHZaXdFHpxAxVXKbjGidm5xwv6bHWidkxxUu6anBi9sjwku4bnZhdEbzkc8GJ2T3BS8N3/lv7CC/a32VIKPorf+nn9UDoxFTUX4t66RO8rKqKl/VECDDLWWWlxoSifzFBVukI8I8s9+4kL4QAk3vPkpcDgpfum+Rlm+Aln0peEAEmjSQvFwgvN5KXS4SXLckLglqkE8kLglqkS8kLglrUtl9mGiGK/uqm2E99ILzsSF4Q1EIMMAhqIQYYBLVIt5IXBLXI15qXW8A/5Tx4lbwQqMUMfNeLQC1y50HywggwQ8kLglqkfckLglpIfX4ItRDoy0QIatHIxKYq1GLNCkUttADDoBZagAlFLQIV/eNrgBeVWjCK/nfJC6LoD0UtziQvjKI/DrXIhVr4VKEWPtVGakHYtRCLfsSuhTh2FYlavCKohTaqVKjFmhWKWvxYDKsTIsBEohZdjVogiv5CLXyqUAufKtTCpwq18Kk27login5x16JQi/Vq/oZCtRBFfyRq0S+7Fh5VqIVThaIWn5KXWNQC8MMvUoshorjUin7GTL9GLcaIQlkLMIjuuBhgEIWySi0QhbJILRBeBhq1QHT6RWqBKJQ7WoAhdPqnBzmbxej0a9SC0enXqMUnwotGLRhFvzZ2xRhV0qjFCOGlhdSiu+kPKkhsXgCIpfjNB/DKOBQ5DtsXm6/+6zC1ovTfRo4znaSmL//IRV1F8g/C4nQq1P6R/6N2alfPf4dS7LUC+sZiBxww6y6W9YABHpEWAcaqxCHEoX+GJ5JVwAiiGBkBrS9xCgFQ1Kcow+25E2ViR93+9o+Hci/KUTF15tB/KSxf3fb/wxhmPleMJ4RSOMwJ0Tgr0iJBAZzbFbkWgNGJ8QRATkXmQCjqNeYAGC0W5yUAnXpx95ZQ1Ee546oyB0Cnvhfl/Fm+1uKJ/6nVOJc2xHjyDujUh1lQVZ9oCxNPAO9OyHe1Nv1BGyXuDREGibSRKMIgkcYcCINEYZhDjrKPGmdLOBBz6Gsb9YCifhDlTclAzCHMJfM4r+KqV/8BRb0WT04B4zdtYw6E8ZtHyQkhnrSNORDiSZTLknHufaojUXGYAyCehLlYXJiDP8W5ua6+3wtgDlo8KcxhjYrzAnmcF1YCMQctngDu+oW5thjnBqa6hk1gDnFGoqJc8W0fcwDEk7btORCYQ+tGosIwB8ClqMIc/ElcwybEkzjMQQta/pnDl7pKr94/c5hIISj+48lfNXIt/8zhnxrivH/m8EO1g53+48mcalpf/pnDgqoaknf+48mSVreJEe8LLGlVdQxYw16p5cwCWMOu0CIeAjCHSs3newBzqNHPrgtgDbtWM8ANGIlq0Pd5Rf/MoVnTo5f+mYOiyUt2mKK+QbnnnznI4v6cFBUVFRUV/Yf+AC3mTpFxiAcLAAAAAElFTkSuQmCC";

export const registeredUsers: personType[] = [
  {
    id: "first",
    firstName: "Yagnik",
    lastName: "Sakhiya",
    userName: "sakhiy07",
    imgUrl: src,
  },
  {
    id: "second",
    firstName: "Harsh",
    lastName: "Rajani",
    userName: "harsh.rajani",
    imgUrl: src,
  },
  {
    id: "third",
    firstName: "Hemang",
    lastName: "Nakarani",
    userName: "hemang",
    imgUrl: src,
  },
];

export const MessagesData: { id: string; messages: messageType[] }[] = [];

export const getMessagesFromData = (id: string): messageType[] => {
  const found = MessagesData.find((item) => item.id === id);
  if (!found) {
    MessagesData.push({ id, messages: [] });
    return [] as messageType[];
  }
  return found.messages;
};

export const addMessageToData = (id: string, message: messageType): void => {
  const found = MessagesData.find((item) => item.id === id);
  if (!found) {
    throw new Error("how it is possible!!!!");
  }
  found.messages.unshift(message);
};
