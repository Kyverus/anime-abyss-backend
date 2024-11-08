import UserService from "../services/UserService.js";

export default class UserController {
  static async createUser(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const user = await UserService.getAll();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.getById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.update(id, req.body);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.delete(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
