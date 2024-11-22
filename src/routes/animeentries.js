import { Router } from "express";
import AnimeEntryController from "../controllers/AnimeEntryController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/", verifyJWT, AnimeEntryController.createAnimeEntry);
router.get("/", verifyJWT, AnimeEntryController.getAllAnimeEntry);
router.get("/:id", verifyJWT, AnimeEntryController.getAnimeEntryById);
router.put("/:id", verifyJWT, AnimeEntryController.updateAnimeEntry);
router.delete("/:id", verifyJWT, AnimeEntryController.deleteAnimeEntry);

export default router;
