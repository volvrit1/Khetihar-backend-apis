import asyncHandler from "#utils/asyncHandler";
import objectParser from "#utils/objectParser";

const bodyParser = asyncHandler((req, _res, next) => {
  req.query = objectParser(req.query);
  if (req.method === "GET" || req.method === "DELETE") return next();
  if (
    !req.headers["content-type"] ||
    !req.headers?.["content-type"].includes("multipart")
  ) {
    return next();
  }

  req.body = objectParser(req.body);
  for (const key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  next();
});

export default bodyParser;
