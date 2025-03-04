import chalk from "chalk";
import morgan from "morgan";

morgan.token("status", (req, res) => {
  const status = res.statusCode;
  if (status >= 500) {
    return chalk.red(status);
  }
  if (status >= 400) {
    return chalk.yellow(status);
  }
  return chalk.green(status);
});

morgan.token("method", (req) => chalk.blue(req.method));
morgan.token("url", (req) => chalk.magenta(req.originalUrl));

const logFormat = ":method :url :status - :response-time ms";
export default logFormat;
