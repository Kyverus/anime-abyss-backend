import AnimeEntryServcice from "../services/AnimeEntryService.js";

export default class AnimeEntryController {
  static async createAnimeEntry(req, res, next) {
    const data = {
      userId: req.user.id,
      animeId: req.body.animeId,
      title: req.body.title,
      imageURL: req.body.imageURL,
      genres: req.body.genres,
      rating: req.body.rating,
      category: req.body.category,
    };

    try {
      const listEntry = await AnimeEntryServcice.create(data);
      res.json(listEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllAnimeEntry(req, res, next) {
    try {
      const animeEntries = await AnimeEntryServcice.getAll(req.user.id);
      res.json(animeEntries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAnimeEntryById(req, res, next) {
    const { id } = req.params;
    try {
      const animeEntry = await AnimeEntryServcice.getById(id);
      if (!animeEntry) {
        return res.status(404).json({ message: "AnimeEntry not found" });
      }
      res.json(animeEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateAnimeEntry(req, res, next) {
    const { id } = req.params;
    try {
      const animeEntry = await AnimeEntryService.update(id, req.body);
      if (!animeEntry) {
        return res.status(404).json({ message: "AnimeEntry not found" });
      }
      res.json(animeEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteAnimeEntry(req, res, next) {
    const { id } = req.params;
    try {
      const animeEntry = await AnimeEntryServcice.delete(id);
      if (!animeEntry) {
        return res.status(404).json({ message: "AnimeEntry not found" });
      }
      res.json(animeEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
