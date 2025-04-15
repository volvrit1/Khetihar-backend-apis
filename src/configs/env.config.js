import { configDotenv } from "dotenv";
import { cleanEnv, str, num } from "envalid";

configDotenv();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  DB_URI: str(),
  NODE_ENV: str(),
  JWT_SECRET: str(),
});

export default env;
