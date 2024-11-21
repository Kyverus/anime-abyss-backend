import mongoose from "mongoose";

const AnimeEntrySchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User invalid"],
  },
  animeId: {
    type: String,
    required: [true, "Anime invalid"],
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
    enum: ["Plan To Watch", "Watching", "Completed", "Dropped"],
    required: [true, "Please provide a category"],
  },
});

const AnimeEntry = mongoose.model(
  "AnimeEntry",
  AnimeEntrySchema,
  "anime-entries"
);

export default AnimeEntry;
