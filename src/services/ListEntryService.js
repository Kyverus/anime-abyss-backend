import ListEntry from "../models/ListEntryModel.js";

export default class ListEntryService {
  static async create(data) {
    try {
      const newListEntry = {
        userId: data.userId,
        animeId: data.animeId,
        rating: data.rating,
        category: data.category,
      };
      const createdListEntry = await ListEntry.create(newListEntry);
      return createdListEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll(userId) {
    try {
      const listEntries = await ListEntry.find({ userId: userId });
      return listEntries;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(entryId) {
    try {
      const listEntry = await ListEntry.findById(entryId);
      return listEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(entryId, data) {
    try {
      const listEntry = await ListEntry.findByIdAndUpdate(entryId, data);
      const updatedListEntry = await ListEntry.findById(id);
      return updatedListEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(entryId) {
    try {
      const listEntry = await ListEntry.findByIdAndDelete(entryId);
      return listEntry;
    } catch (error) {
      throw new Error(error);
    }
  }
}
