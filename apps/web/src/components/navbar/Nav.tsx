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
import { useAppDispatch, useAppSelector } from "../../lib/hook";
const NavNoSSR = dynamic(() => import("./NavNoSSR"), { ssr: false });
import { logoutReducer } from "../../lib/features/auth/authSlice";

export default function Nav() {
  const dispatch = useAppDispatch();
  let links = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
  ];
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    links = links.filter((link) => link.name !== "Login");
    links.push({ name: "Dashboard", href: "/app/dashboard" });
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
            {isAuthenticated && (
              <Button onClick={() => dispatch(logoutReducer())}>
                <NavLink href={"/app/logout"}>Logout</NavLink>
              </Button>
            )}
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
