import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../lib/hook";
import { authReducer, logoutReducer } from "../../lib/features/auth/authSlice";
import { Heading } from "@chakra-ui/react";

const NavNoSSR = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const firstNameCookie = Cookies.get("userName");
    const isAuthenticated = Cookies.get("isAuthenticated");

    if (isAuthenticated) {
      dispatch(authReducer({ firstName: firstNameCookie }));
    } else {
      dispatch(logoutReducer());
    }
  }, [dispatch]);

  const firstName = useAppSelector((state) => state.auth.user?.firstName);

  return (
    <Heading as={"h6"} size={"sm"}>
      {firstName}
    </Heading>
  );
};

export default NavNoSSR;
