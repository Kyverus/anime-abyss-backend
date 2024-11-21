import AnimeEntry from "../models/AnimeEntryModel.js";

export default class ListEntryService {
  static async create(data) {
    try {
      const newAnimeEntry = {
        userId: data.userId,
        animeId: data.animeId,
        title: data.title,
        imageURL: data.imageURL,
        genre: data.genre,
        rating: data.rating,
        category: data.category,
      };
      const createdAnimeEntry = await AnimeEntry.create(newAnimeEntry);
      return createdAnimeEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll(userId) {
    try {
      const animeEntries = await AnimeEntry.find({ userId: userId });
      return animeEntries;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(entryId) {
    try {
      const animeEntry = await AnimeEntry.findById(entryId);
      return animeEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(entryId, data) {
    try {
      const animeEntry = await AnimeEntry.findByIdAndUpdate(entryId, data);
      const updatedAnimeEntry = await AnimeEntry.findById(id);
      return updatedAnimeEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(entryId) {
    try {
      const animeEntry = await AnimeEntry.findByIdAndDelete(entryId);
      return animeEntry;
    } catch (error) {
      throw new Error(error);
    }
  }
}
