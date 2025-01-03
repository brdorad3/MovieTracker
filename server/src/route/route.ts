import { Router } from "express";
import { search_movie, details, fetch_image, fetch_similar, fetch_reviews, fetch_cast, fetch_search, trending_movie } from "../controllers";

const router = Router()

router.get("/api/trending", search_movie);
router.get("/api/trending_movies", trending_movie);
router.post("/api/details", details);
router.post("/api/images", fetch_image);
router.post("/api/similar", fetch_similar);
router.post("/api/reviews", fetch_reviews);
router.post("/api/cast", fetch_cast);
router.post("/api/search", fetch_search);

export default router