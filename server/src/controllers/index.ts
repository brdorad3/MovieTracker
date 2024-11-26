import "dotenv/config"

import { MovieDb } from 'moviedb-promise'
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";

const moviedb = new MovieDb(`${process.env.API_KEY}`)

interface TrendingItem {
  backdrop_path: string;
  id: number;
  name?: string; 
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
}

const search_movie = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await moviedb.trending({time_window: "day", media_type: "all", language: "en-US",})
        
      if(resp && resp.results){
        const rep = resp.results as TrendingItem[]
        let filteredResults = rep.filter(
          (item) => item.vote_count >= 50
        );
        filteredResults = filteredResults.sort((a,b) => b.popularity - a.popularity)
        
        res.status(200).json(filteredResults)
      }else{
        res.status(404).json({ message: "No trending movies found." });

      }
      
        
      } catch (e) {
        console.log(e)
      }
    
})
const details = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    if(req.body.item.media_type == "tv"){
     const response = await moviedb.tvInfo({id:req.body.item.id})
     res.status(200).json(response)
    }else{
      const response = await moviedb.movieInfo({id:req.body.item.id})
     res.status(200).json(response)
    }
   
      
    } catch (e) {
      console.log(e)
    }
  
})

  export{
    search_movie,
    details
  }