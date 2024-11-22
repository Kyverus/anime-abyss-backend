import AnimeEntryService from "../services/AnimeEntryService.js";

export default class AnimeEntryController {
  static async createAnimeEntry(req, res, next) {
    try {
      const validateDuplication = await AnimeEntryService.getByKeyAndValue({
        userId: req.user.id,
        animeId: req.body.animeId,
      });

      if (validateDuplication) {
        return res.status(400).json({ message: "Anime is already listed" });
      }

      const data = {
        userId: req.user.id,
        animeId: req.body.animeId,
        title: req.body.title,
        imageURL: req.body.imageURL,
        genres: req.body.genres,
        rating: req.body.rating,
        category: req.body.category,
      };
      const listEntry = await AnimeEntryService.create(data);
      res.json(listEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllAnimeEntry(req, res, next) {
    try {
      const animeEntries = await AnimeEntryService.getAll(req.user.id);
      res.json(animeEntries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAnimeEntryById(req, res, next) {
    const { id } = req.params;
    try {
      const animeEntry = await AnimeEntryService.getByKeyAndValue({
        userId: req.user.id,
        animeId: id,
      });
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
      const validateEntry = await AnimeEntryService.getById(id);

      if (validateEntry.userId != req.user.id) {
        return res.status(403);
      }

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
      const validateEntry = await AnimeEntryService.getById(id);

      if (validateEntry.userId != req.user.id) {
        return res.status(403);
      }

      const animeEntry = await AnimeEntryService.delete(id);
      if (!animeEntry) {
        return res.status(404).json({ message: "AnimeEntry not found" });
      }
      res.json(animeEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
