import { endPointV1 } from "../../test.config";
import { createServer } from "../../../src/server";
import supertest from "supertest";
import prisma from "../../../src/common/database/prisma";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { beforeEach } from "vitest";

describe("getMe", () => {
  const endpoint = `${endPointV1}/getme`;
  const server = createServer();
  const request = supertest.agent(server);
  let accessToken: string;
  const userObj = {
    email: faker.internet.email(),
    password: "abc123",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };

  beforeEach(async () => {
    const hashPassword = await hash(userObj.password, 10);
    await prisma.user.create({
      data: { ...userObj, password: hashPassword },
    });
    const res = await request.post(`${endPointV1}/login`).send({
      email: userObj.email,
      password: userObj.password,
    });
    accessToken = res.body.data.tokens.accessToken;
  });

  it("should return 200 when success", async () => {
    const res = await request
      .set("Authorization", `Bearer ${accessToken}`)
      .get(endpoint);
    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(userObj.email);
  });
});
