import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;

// const common = (input1, input2) => {
//   let obj = {};
//   for (let i in input1) {
//     if (input1[1] === input2[i]) {
//       obj[i] = input1;
//     }
//   }
//   return obj;
// };

// function sum(a, b, c) {
//   return {
//     sumOf2: function () {
//       return a + b;
//     },
//     sumOf3: function () {
//       return a + b + c;
//     },
//   };
// }

// const res = sum();
// console.log(res.sumOf2);

// const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const res = num.map((item) => {
//   return item += 1
// }).filter((num) => num >= 5 )

// console.log(res);

// Q1. New es6 features, difference between regular and arrow functions, difference between promises and async/await, implementation of time-complexity in javascript context, et.

// What is diffence between spread and rest operator

//What is use effect use memo
// What is Event Loop in Node js
// What are synchronous and asynchronous functions?
//What is virtual DOM and how it works
//What is the request, response and next parameter in express function?
// Asked also some basic questions from backend. Like how express.js, rest api works.
//Clousures in javascript , states , events in node, message queue, aggregation in mongo, joins in mysql, asked me to fetch api's in react on codesandbox.
//Create a react table with a button and when clicked, route to another page, trigger an API, and display the data in tabular format using react.js .
//How node handles concurrency
// What is diffrence between spread and rest operator

// Explanation of call apply and bind methods

//call apply and bind all methods are used for changing the current context in a function for example

// let person = {
//   name: "Karan thakur",
//   hello: function (thing) {
//     console.log(`${this.name} says hello ${thing}`);
//   },
// };

// let alterEgo = {
//   name: "Pawan",
// };

// person.hello.call(alterEgo, "world");
// person.hello.apply(alterEgo, ["world"]);
// const newName = person.hello.bind(alterEgo);
// newName();

// lifecycle methods of react Component:
//---------------for class components-------------
// 1- There are basically three lifecycle methods first one is componentDidMount() this function run when the component is rendered first time
//2 - The second method is componentDidUpdate() this function takes to parameters previous and current state and if the state changes then this function runs
//3 - The third one is componentWillUnmount()  this function runs when a component is removed from the DOM
//---------------for functional components--------
//In functional components to show the lifecycle methods we use hooks a very famous hook provided  by the react itself useEffect() to show the lifecycle method of a component
