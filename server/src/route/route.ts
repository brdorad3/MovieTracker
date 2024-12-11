import { Router } from "express";
import { search_movie, details, fetch_image } from "../controllers";

const router = Router()

router.get("/api/trending", search_movie);
router.post("/api/details", details);
router.post("/api/images", fetch_image);

export default router