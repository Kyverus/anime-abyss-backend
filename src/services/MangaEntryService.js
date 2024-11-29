import MangaEntry from "../models/MangaEntryModel.js";

export default class MangaEntryService {
  static async create() {
    try {
      const newMangaEntry = {
        userId: data.userId,
        animeId: data.mangaId,
        title: data.title,
        imageURL: data.imageURL,
        genres: data.genres,
        rating: data.rating,
        category: data.category,
      };
      const createdMangaEntry = await MangaEntry.create(newMangaEntry);
      return createdMangaEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll(userId) {
    try {
      const mangaEntries = await MangaEntry.find({ userId: userId });
      return mangaEntries;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getById(entryId) {
    try {
      const mangaEntry = await MangaEntry.findById(entryId);
      return mangaEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getByKeyAndValue(schema) {
    try {
      const mangaEntry = await MangaEntry.findOne(schema).exec();
      return mangaEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(entryId, data) {
    try {
      const mangaEntry = await MangaEntry.findByIdAndUpdate(entry, data);
      const updatedMangaEntry = await MangaEntry.findById(id);
      return updatedMangaEntry;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async delete(entryId) {
    try {
      const mangaEntry = await MangaEntry.findByIdAndDelete(entryId);
      return mangaEntry;
    } catch (error) {
      throw new Error(error);
    }
  }
}
