"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";

const NavLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default NavLink;
