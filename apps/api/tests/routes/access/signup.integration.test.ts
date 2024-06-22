import supertest from "supertest";
import { createServer } from "../../../src/server";
import { describe, it, expect } from "vitest";
import { endPointV1 } from "../../test.config";

describe("signup", () => {
  const endpoint = `${endPointV1}/signup`;
  const server = createServer();
  const request = supertest.agent(server);

  describe("body", () => {
    it("shold return 422 when empty body", async () => {
      const res = await request.post(endpoint).send({});
      expect(res.status).toBe(422);
    });
  });

  describe("response", () => {
    it("should return 201 when success", async () => {
      const res = await request.post(endpoint).send({
        email: "a@gmail.com",
        firstName: "abc",
        lastName: "xyz",
        password: "123456",
        confirmPassword: "123456",
      });
      expect(res.status).toBe(201);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.password).not.toBeDefined();
    });
  });
});
