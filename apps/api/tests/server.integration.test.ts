import supertest from "supertest";
import { endPointV1 } from "./test.config";
import { createServer } from "../src/server";
import { describe, it, expect } from "vitest";

describe("Server test hello", () => {
  const endpoint = `${endPointV1}/hello`;
  const server = createServer();
  const request = supertest.agent(server);

  it("should return 200", async () => {
    const response = await request.get(endpoint);
    expect(response.status).toBe(200);
  });
});
