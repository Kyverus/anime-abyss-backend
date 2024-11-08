import jwt from "jsonwebtoken";
import UserService from "../services/UserService.js";

export function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
    if (error) return res.sendStatus(403);

    const user = await UserService.getById(payload.id);

    if (!user) return res.sendStatus(403);

    req.user = user;
    next();
  });
}
