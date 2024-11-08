import { Router } from "express";
import AuthController from "../controllers/auth/AuthController.js";
import RefreshTokenController from "../controllers/auth/RefreshTokenController.js";
import UserController from "../controllers/UserController.js";
import {
  validateUniqueUser,
  confirmPassword,
} from "../middleware/userValidation.js";

const router = Router();

router.post("/login", AuthController.loginUser);
router.get("/refresh", RefreshTokenController.refreshToken);
router.get("/logout", AuthController.logoutUser);

router.post(
  "/register",
  validateUniqueUser,
  confirmPassword,
  UserController.createUser
);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
