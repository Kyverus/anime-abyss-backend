import mongoose from "mongoose";

const MangaEntrySchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User invalid"],
  },
  mangaId: {
    type: String,
    required: [true, "Manga invalid"],
  },
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating"],
  },
  category: {
    type: String,
    enum: ["Plan To Read", "Reading", "Completed", "On Hold", "Dropped"],
    required: [true, "Please provide a category"],
  },
});

const MangaEntry = mongoose.model(
  "MangaEntry",
  MangaEntrySchema,
  "manga-entries"
);

export default MangaEntry;
