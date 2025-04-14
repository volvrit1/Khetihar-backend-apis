import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import path from "node:path";
import express from "express";
import env from "#configs/env";
import logger from "#configs/logger";
import routeMapper from "#routes/index";
import parser from "#middlewares/parser";
import { fileURLToPath } from "node:url";
import sequelize from "#configs/database";
import { globalErrorHandler } from "#utils/error";
import sessionMiddleware from "#middlewares/session";

if (!env.isDev) {
  await sequelize.sync({ alter: true });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = express();

server.use(morgan(logger));
server.use(cors());
server.use("/uploads", express.static(path.join(__dirname, "../uploads")));
server.use(multer().any());
server.use(express.json());
server.use(sessionMiddleware);
server.use(parser);
server.use("/api", routeMapper);
server.use(globalErrorHandler);

export default server;
