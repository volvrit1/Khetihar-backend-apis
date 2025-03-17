import sequelize from "#configs/database";
import { createNamespace } from "cls-hooked";

export const session = createNamespace("userSession");
export const transactionMethods = ["POST", "PUT", "PATCH", "DELETE"]; // Request methods in which a transaction will be initiated

const sessionMiddleware = (req, _res, next) => {
  session.run(async () => {
    //TODO: transaction has to be implmented
    if (transactionMethods.includes(req.method)) {
      const transactionSession = await sequelize.transaction();
      session.set("transaction", transactionSession);
    }
    session.set("files", req.files ?? null);
    session.set("userId", req.params.id);
    next();
  });
};

export const setSessionData = (key, value) => {
  session.set(key, value);
};

export const getSessionData = (key) => {
  return session.get(key);
};

export default sessionMiddleware;
