import env from "#configs/env";
import jwt from "jsonwebtoken";
import httpstatus from "http-status";

export const createToken = (payload, secret = env.JWT_SECRET, options = {}) => {
  const token = jwt.sign(payload, secret, { ...options });
  return token;
};

export const generaterandompassword = (length = 12) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomindex = math.floor(math.random() * chars.length);
    password += chars[randomindex];
  }

  return password;
};

export const verifyToken = (token, secret = env.JWT_SECRET) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    throw {
      status: false,
      message: "invalid token please login again",
      httpstatus: httpstatus.UNAUTHORIZED,
    };
  }
};
