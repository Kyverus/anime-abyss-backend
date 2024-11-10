import User from "../models/auth/UserModel.js";

export default class UserService {
  static async create(data) {
    try {
      const newUser = {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
      };
      const createdUser = await User.create(newUser);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getByKeyAndValue(schema) {
    try {
      const user = await User.findOne(schema).exec();
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async update(userId, data) {
    try {
      const user = await User.findByIdAndUpdate(userId, data);
      const updatedUser = await User.findById(userId);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  static async delete(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
