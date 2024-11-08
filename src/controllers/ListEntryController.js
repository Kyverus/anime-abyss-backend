import ListEntryService from "../services/ListEntryService.js";

export default class ListEntryController {
  static async createListEntry(req, res, next) {
    const data = {
      userId: req.user.id,
      animeId: req.body.animeId,
      rating: req.body.rating,
      category: req.body.category,
    };

    try {
      const listEntry = await ListEntryService.create(data);
      res.json(listEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllListEntry(req, res, next) {
    try {
      const listEntries = await ListEntryService.getAll(req.user.id);
      res.json(listEntries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getListEntryById(req, res, next) {
    const { id } = req.params;
    try {
      const listEntry = await ListEntryService.getById(id);
      if (!listEntry) {
        return res.status(404).json({ message: "ListEntry not found" });
      }
      res.json(listEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateListEntry(req, res, next) {
    const { id } = req.params;
    try {
      const listEntry = await ListEntryService.update(id, req.body);
      if (!listEntry) {
        return res.status(404).json({ message: "ListEntry not found" });
      }
      res.json(listEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteListEntry(req, res, next) {
    const { id } = req.params;
    try {
      const listEntry = await ListEntryService.delete(id);
      if (!listEntry) {
        return res.status(404).json({ message: "ListEntry not found" });
      }
      res.json(listEntry);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
