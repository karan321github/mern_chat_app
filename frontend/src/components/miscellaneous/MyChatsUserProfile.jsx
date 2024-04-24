import React from "react";
import { ChatState } from "../../context/chatContext";
import { Box, Image } from "@chakra-ui/react";

function MyChatsUserProfile() {
  const { user } = ChatState();
  return (
    <Box wi>
      <Image src={user.pic}/>
    </Box>
  );
}

export default MyChatsUserProfile;
