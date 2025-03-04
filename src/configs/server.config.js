import morgan from "morgan";
import express from "express";
import logger from "#configs/logger";
import sequelize from "#configs/database";

const server = express();

server.use(morgan(logger));

export default server;
