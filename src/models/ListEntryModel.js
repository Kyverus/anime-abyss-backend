import mongoose from "mongoose";

const ListEntrySchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User invalid"],
  },
  animeId: {
    type: String,
    required: [true, "Anime invalid"],
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

const ListEntry = mongoose.model("ListEntry", ListEntrySchema, "list-entries");

export default ListEntry;
