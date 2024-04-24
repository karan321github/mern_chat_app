import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/chatContext";
import axios from "axios";
import { Avatar, Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "../ChatLoading";
import { getSender } from "../../config/chatLogics";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Failed to load the chats",
        status: "error",
        duration: "5000",
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      width={{ base: "100%", md: "31%" }}
    >
      <Box
        pb={3}
        px={3}
        fontFamily="Poppins"
        alignItems="center"
        justifyContent="space-between"
        fontSize={{ base: "28px", md: "31px" }}
        display="flex"
        width="100%"
        color="black"
      >
        chats
        <GroupChatModal>
          <Button
            display="flex"
            rightIcon={<AddIcon />}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            borderRadius="full"
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat, index) => {
              console.log("Chat index:", index, chat); // Add this line for debugging
              return (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  {/* Add null check before accessing isGroupChat */}
                  <Box display="flex">
                    <Avatar
                      size="sm"
                      cursor="pointer"
                      name={user.name}
                      src={chat.users && chat.users.length > 0 ? chat.users[0].pic : ""}
                    />

                    <Text mx={2}>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                  </Box>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
