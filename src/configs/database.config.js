import env from "#configs/env";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  logging: false, // Disable logging
});

try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully!");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}

export default sequelize;
