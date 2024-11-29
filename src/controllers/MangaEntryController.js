import MangaEntryService from "../services/MangaEntryService.js";

export default class MangaEntryController {
  static async createMangaEntry(req, res, next) {
    try {
      const validateDuplication = await MangaEntryService.getByKeyAndValue({
        userId: req.user.id,
        mangaId: req.body.mangaId,
      });

      if (validateDuplication) {
        return res.status(400).json({ message: "Manga is already listed" });
      }

      const data = {
        userId: req.user.id,
        mangaId: req.body.mangaId,
        title: req.body.title,
        imageURL: req.body.imageURL,
        genres: req.body.genres,
        rating: req.body.rating,
        category: req.body.category,
      };

      const mangaEntry = await MangaEntryService.create(data);
      res.json(mangaEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllMangaEntry(req, res, next) {
    try {
      const mangaEntries = await MangaEntryService.getAll(req.user.id);
      res.json(mangaEntries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMangaEntryById(req, res, next) {
    const { id } = req.params;
    try {
      const mangaEntry = await MangaEntryService.getByKeyAndValue({
        userId: req.user.id,
        mangaId: id,
      });

      if (!mangaEntry) {
        return res.status(404).json({ message: "MangaEntry not found" });
      }
      res.json(mangaEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateMangaEntry(req, res, next) {
    const { id } = req.params;
    try {
      const validateEntry = await MangaEntryService.getById(id);

      if (validateEntry.userId != req.user.id) {
        return res.status(403);
      }

      const mangaEntry = await MangaEntryService.update(id, req.body);
      if (!mangaEntry) {
        return res.status(404).json({ message: "MangaEntry not found" });
      }
      res.json(mangaEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteMangaEntry(req, res, next) {
    const { id } = req.params;

    try {
      const validateEntry = await MangaEntryService.getById(id);

      if (validateEntry.userId != req.user.id) {
        return res.status(403);
      }

      const mangaEntry = await MangaEntryService.delete(id);

      if (!mangaEntry) {
        return res.status(404).json({ message: "MangaEntry not found" });
      }
      res.json(mangaEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
