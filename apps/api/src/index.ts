import Logger from "@repo/logger";
import { createServer } from "./server";
import { port } from "./config";
import * as emoji from "node-emoji";

const server = createServer();

server
  .listen(port, () => {
    Logger.info(`${emoji.get("rocket")} server running on port : ${port}`);
  })
  .on("error", (e) => Logger.error(e));
