import bcrypt from "bcrypt";
import UserService from "../../services/UserService.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/generateToken.js";

export default class AuthController {
  static async loginUser(req, res, next) {
    try {
      const user = await UserService.getByKeyAndValue({
        email: req.body.email,
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Invalid username, email or password" });
      }

      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isValidPassword) {
        return res
          .status(404)
          .json({ message: "Invalid username, email or password" });
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      //save refreshToken to Database
      const updatedUser = await UserService.update(user.id, {
        token: refreshToken,
      });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, //1day
      });
      res.json({ accessToken: accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async logoutUser(req, res, next) {
    //ON CLIENT ALSO DELETE THE ACCESS TOKEN

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const foundUser = await UserService.getByKeyAndValue({
      token: refreshToken,
    });

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      return res.sendStatus(204);
    }

    const updatedUser = await UserService.update(foundUser.id, {
      $unset: { token: true },
    });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }
}
