"use client";

import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";
import dynamic from "next/dynamic";
import { useAppSelector } from "../../lib/hook";
const NavNoSSR = dynamic(() => import("./NavNoSSR"), { ssr: false });

export default function Nav() {
  let links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/app/dashboard" },
    { name: "Login", href: "/login" },
  ];
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    links = links.filter((link) => link.name !== "Login");
  }

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading as={"h3"} size={"lg"}>
              NextJS Express App
            </Heading>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </HStack>

          <Flex alignItems={"center"} gap={4}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
            <NavNoSSR />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
