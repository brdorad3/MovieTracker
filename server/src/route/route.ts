import { Router } from "express";
import { search_movie, ping, details, fetch_image, fetch_similar, fetch_reviews, fetch_cast, fetch_search, fetch_detail_review, delete_review, trending_movie, trending_tv, toprated_movies, all_time_movies, saveReview, fetch_user_review } from "../controllers";

const router = Router()

router.get("/api/trending", search_movie);
router.get("/api/ping", ping);
router.get("/api/alltimemovies", all_time_movies);
router.post("/api/trending_movies", trending_movie);
router.post("/api/trending_tv", trending_tv);
router.get("/api/toprated_movies", toprated_movies)
router.post("/api/details", details);
router.post("/api/images", fetch_image);
router.post("/api/similar", fetch_similar);
router.post("/api/reviews", fetch_reviews);
router.post("/api/cast", fetch_cast);
router.post("/api/search", fetch_search);
router.post("/api/save_review", saveReview)
router.post("/api/fetch_user_review", fetch_user_review)
router.post("/api/fetch_detail_review", fetch_detail_review)
router.post("/api/delete_review", delete_review)


export default router