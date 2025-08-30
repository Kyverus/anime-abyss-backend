import { allowedOrigins } from "../config/allowedOrigins.js";

export function credentials(req, res, next) {
  const origin = req.headers.origin;

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ message: "Not allowed by CORS" });
  }

  next();
}
