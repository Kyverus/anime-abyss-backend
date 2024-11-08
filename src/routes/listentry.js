import { Router } from "express";
import ListEntryController from "../controllers/ListEntryController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

router.post("/", verifyJWT, ListEntryController.createListEntry);
router.get("/", verifyJWT, ListEntryController.getAllListEntry);
router.get("/:id", verifyJWT, ListEntryController.getListEntryById);
router.put("/:id", verifyJWT, ListEntryController.updateListEntry);
router.delete("/:id", verifyJWT, ListEntryController.deleteListEntry);

export default router;
