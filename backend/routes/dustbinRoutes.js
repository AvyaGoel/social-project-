import express from "express";
import { getDustbins, addDustbin, updateDustbinStatus } from "../controllers/dustbinController.js";

const router = express.Router();

router.get("/", getDustbins);
router.post("/", addDustbin);
router.put("/:id", updateDustbinStatus);

export default router;
