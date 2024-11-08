import UserService from "../../services/UserService.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../helpers/generateToken.js";

export default class RefreshTokenController {
  static async refreshToken(req, res, next) {
    try {
      const cookies = req.cookies;

      if (!cookies?.jwt) return res.sendStatus(401);

      const refreshToken = cookies.jwt;

      const foundUser = await UserService.getByKeyAndValue({
        token: refreshToken,
      });

      if (!foundUser) return res.sendStatus(403);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, payload) => {
          if (error || foundUser.id !== payload.id) return res.sendStatus(403);
          const accessToken = generateAccessToken(payload.id);
          res.json({ accessToken: accessToken });
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
