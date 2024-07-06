"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const Notfound = () => {
  const router = useRouter();
  return (
    <Flex
      justifyItems={"center"}
      alignItems={"center"}
      justifyContent={"center"}
      pt={200}
      direction={"column"}
      gap={4}
    >
      <Heading>Page not found</Heading>
      <Button onClick={() => router.back()}>Back</Button>
    </Flex>
  );
};

export default Notfound;
