import { configDotenv } from "dotenv";
import { cleanEnv, str, num } from "envalid";

configDotenv();

const env = cleanEnv(process.env, {
  PORT: num({ default: 5000 }),
  DB_USER: str(),
  DB_PASS: str(),
  DB_NAME: str(),
  DB_HOST: str({ default: "localhost" }),
  DB_DIALECT: str({ default: "mysql" }),
});

export default env;
