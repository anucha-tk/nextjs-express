import React from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../lib/hook";
import { authReducer } from "../../lib/features/auth/authSlice";
import { Heading } from "@chakra-ui/react";

const NavNoSSR = () => {
  const firstNameCookie = Cookies.get("userName");
  const isAuthenticated = Cookies.get("isAuthenticated");

  const dispatch = useAppDispatch();
  isAuthenticated && dispatch(authReducer({ firstName: firstNameCookie }));

  const firstName = useAppSelector((state) => state.auth.user?.firstName);

  return (
    <Heading as={"h6"} size={"sm"}>
      {firstName}
    </Heading>
  );
};

export default NavNoSSR;
