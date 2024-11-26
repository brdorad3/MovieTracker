import { Router } from "express";
import { search_movie, details } from "../controllers";

const router = Router()

router.get("/api/trending", search_movie);
router.post("/api/details", details);

export default router