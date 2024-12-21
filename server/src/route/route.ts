import { Router } from "express";
import { search_movie, details, fetch_image, fetch_similar, fetch_reviews } from "../controllers";

const router = Router()

router.get("/api/trending", search_movie);
router.post("/api/details", details);
router.post("/api/images", fetch_image);
router.post("/api/similar", fetch_similar);
router.post("/api/reviews", fetch_reviews);


export default router