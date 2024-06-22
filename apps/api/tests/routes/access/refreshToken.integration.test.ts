import { faker } from "@faker-js/faker";
import { beforeEach, describe, it } from "vitest";
import { endPointV1 } from "../../test.config";
import { createServer } from "../../../src/server";
import supertest from "supertest";
import { hash } from "bcrypt";
import prisma from "../../../src/common/database/prisma";
import resetDb from "../../helpers/reset-db";

describe("Refresh token", () => {
  const endpoint = `${endPointV1}/token/refresh`;
  const server = createServer();
  const request = supertest.agent(server);
  let accessToken: string;
  let refreshToken: string;
  let refreshTokenTwo: string;

  const userObj = {
    email: faker.internet.email(),
    password: "abc123",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
  const userObjTwo = {
    email: faker.internet.email(),
    password: "xyz123",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };

  beforeEach(async () => {
    const [hpUserOne, hpUserTwo] = await Promise.all([
      hash(userObj.password, 10),
      hash(userObjTwo.password, 10),
    ]);
    await Promise.all([
      prisma.user.create({
        data: { ...userObj, password: hpUserOne },
      }),
      prisma.user.create({
        data: { ...userObjTwo, password: hpUserTwo },
      }),
    ]);
    const [resUser, resUserTwo] = await Promise.all([
      request.post(`${endPointV1}/login`).send({
        email: userObj.email,
        password: userObj.password,
      }),
      request.post(`${endPointV1}/login`).send({
        email: userObjTwo.email,
        password: userObjTwo.password,
      }),
    ]);
    accessToken = resUser.body.data.tokens.accessToken;
    refreshToken = resUser.body.data.tokens.refreshToken;
    refreshTokenTwo = resUserTwo.body.data.tokens.refreshToken;
  });

  it("should return 200 when refresh token success", async () => {
    const res = await request
      .set("Authorization", `Bearer ${accessToken}`)
      .post(endpoint)
      .send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.data.tokens.accessToken).toBeDefined();
    expect(res.body.data.tokens.refreshToken).toBeDefined();
  });

  it("should return 401 when refreshToken sub missmatch", async () => {
    const res = await request
      .set("Authorization", `Bearer ${accessToken}`)
      .post(endpoint)
      .send({ refreshToken: refreshTokenTwo });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Access token and refresh token mismatch/);
  });

  it("should return 401 when refreshToken notfound", async () => {
    await prisma.keystore.deleteMany();
    const res = await request
      .set("Authorization", `Bearer ${accessToken}`)
      .post(endpoint)
      .send({ refreshToken });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/Invalid refresh token/);
  });

  // make test case bottom down we test when reset db (user have accessToken disapear)
  it("should return 401 when user not found", async () => {
    await resetDb();
    const res = await request
      .set("Authorization", `Bearer ${accessToken}`)
      .post(endpoint)
      .send({ refreshToken });
    expect(res.status).toBe(401);
  });
});
