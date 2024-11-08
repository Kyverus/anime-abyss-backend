import jwt from "jsonwebtoken";

export function generateAccessToken(userId) {
  const payload = { id: userId };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
  return accessToken;
}
export function generateRefreshToken(userId) {
  const payload = { id: userId };
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return refreshToken;
}
