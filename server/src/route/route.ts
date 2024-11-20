import { Router } from "express";
import { search_movie } from "../controllers";

const router = Router()

router.get("/api/trending", search_movie);

export default router