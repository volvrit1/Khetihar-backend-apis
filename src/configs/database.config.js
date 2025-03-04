import env from "#configs/env";
import chalk from "chalk";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  logging: console.log ?? false, // Disable logging
});

await sequelize.authenticate();
console.log(chalk.magenta("Connected to database"));

export default sequelize;
