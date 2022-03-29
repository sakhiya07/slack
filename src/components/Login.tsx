import React from "react";
import "../styles/_login.css";
import { useState } from "react";
import { LoginPropsType } from "../types";
import { src } from "../data";

const Login = (props: LoginPropsType) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const randomId = (Math.random() + 1).toString(36).substring(7);

    const user = {
      firstName,
      lastName,
      password,
      userName,
      imgUrl: src,
      id: randomId,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    console.log(user);

    const response = await fetch("http://localhost:3000/login", requestOptions);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) props.loginUser(user);
    else {
      console.log("not successfully logined!!!");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Welcome to Slack </h2>
        <form onSubmit={onSubmit}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            name="UserName"
            type="text"
            placeholder="User Name"
            required
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
