import UserService from "../services/UserService.js";

export async function validateUniqueUser(req, res, next) {
  try {
    const errors = [];
    const validateEmail = await UserService.getByKeyAndValue({
      email: req.body.email,
    });
    if (validateEmail) {
      errors.push({
        message: "Email is already in use",
      });
    }
    const validateUsername = await UserService.getByKeyAndValue({
      username: req.body.username,
    });
    if (validateUsername) {
      errors.push({
        message: "Username is already in use",
      });
    }

    if (errors.length > 0) {
      return res.status(404).json({ errors: errors });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export function confirmPassword(req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  next();
}