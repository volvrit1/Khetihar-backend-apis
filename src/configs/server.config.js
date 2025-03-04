import morgan from "morgan";
import express from "express";
import env from "#configs/env";
import logger from "#configs/logger";
import routeMapper from "#routes/index";
import parser from "#middlewares/parser";
import sequelize from "#configs/database";
import { globalErrorHandler } from "#utils/error";
import sessionMiddleware from "#middlewares/session";

if (!env.isDev) {
  await sequelize.sync({ alter: true });
}

const server = express();

server.use(morgan(logger));
server.use(express.json());
server.use(sessionMiddleware);
server.use(parser);
server.use("/api", routeMapper);
server.use(globalErrorHandler);

export default server;
