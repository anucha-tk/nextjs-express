import supertest from "supertest";
import { createServer } from "../../../src/server";
import { endPointV1 } from "../../test.config";
import prisma from "../../../src/common/database/prisma";
import bcrypt from "bcrypt";
import { describe, it, expect } from "vitest";

describe("login", () => {
  const endpoint = `${endPointV1}/login`;
  const server = createServer();
  const request = supertest.agent(server);

  describe("body", () => {
    it("shold return 422 when empty body", async () => {
      const res = await request.post(endpoint).send({});
      expect(res.status).toBe(422);
    });
  });

  describe("response", () => {
    it("should return 401 when user not found", async () => {
      const res = await request.post(endpoint).send({
        email: "a@gmail.com",
        password: "123456",
      });
      expect(res.status).toBe(401);
    });
    it("should return 200 when success", async () => {
      const password = "123456";
      const email = "a@gmaill.com";
      const hashPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          firstName: "abc",
          lastName: "xyz",
          password: hashPassword,
        },
      });
      const res = await request.post(endpoint).send({
        email,
        password: password,
      });
      expect(res.status).toBe(200);
      expect(res.body.data.tokens).toBeDefined();
    });
  });
});
