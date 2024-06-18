import Logger from "@repo/logger";
import { createServer } from "./server";
import { port } from "./config";

const server = createServer();

server
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on("error", (e) => Logger.error(e));
