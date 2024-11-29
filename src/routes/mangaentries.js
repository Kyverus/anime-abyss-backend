import { Router } from "express";
import MangaEntryController from "../controllers/MangaEntryController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/", verifyJWT, MangaEntryController.createMangaEntry);
router.get("/", verifyJWT, MangaEntryController.getAllMangaEntry);
router.get("/:id", verifyJWT, MangaEntryController.getMangaEntryById);
router.put("/:id", verifyJWT, MangaEntryController.updateMangaEntry);
router.delete("/:id", verifyJWT, MangaEntryController.deleteMangaEntry);

export default router;
