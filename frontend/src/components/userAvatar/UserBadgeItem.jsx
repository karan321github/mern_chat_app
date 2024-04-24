import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      m={1}
      mb={2}
      // borderRadius="lg"
      variant="solid"
      fontSize="12"
      backgroundColor=""
      cursor="pointer"
      color="white"
      onClick={() => handleFunction()}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
