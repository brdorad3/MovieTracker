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
    
    if(req.body.item.media_type == "tv" || req.body.item.first_air_date){
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

const fetch_image = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    if(req.body.info.media_type == "tv" || req.body.info.first_air_date){
      const response = await moviedb.tvImages({id:req.body.info.id})
      res.status(200).json(response)
     }else{
       const response = await moviedb.movieImages({id:req.body.info.id})
      res.status(200).json(response)
     }
      
    } catch (e) {
      console.log(e)
    }
})

const fetch_similar = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    
    if(req.body.info.media_type == "tv" || req.body.info.first_air_date){
      const response = await moviedb.tvSimilar({id:req.body.info.id})
      res.status(200).json(response)
     }else{
       const response = await moviedb.movieSimilar({id:req.body.info.id})
      res.status(200).json(response)
     }
      
    } catch (e) {
      console.log(e)
    }
})

const fetch_reviews = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
   
    if(req.body.info.media_type == "tv" || req.body.info.first_air_date){
      const response = await moviedb.tvReviews({id:req.body.info.id})
      res.status(200).json(response)
     }else{
       const response = await moviedb.movieReviews({id:req.body.info.id})
      res.status(200).json(response)
     }
      
    } catch (e) {
      console.log(e)
    }
})
const fetch_cast = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
   
    if(req.body.info.media_type == "tv" || req.body.info.first_air_date){
      const response = await moviedb.tvCredits({id:req.body.info.id})
      res.status(200).json(response)
     }else{
       const response = await moviedb.movieCredits({id:req.body.info.id})
      res.status(200).json(response)
     }
      
    } catch (e) {
      console.log(e)
    }
})
const fetch_search = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    if(req.body.media_type == "movie"){
      const response = await moviedb.searchMovie({query:req.body.info})
      res.status(200).json(response)
    }else{
      const response = await moviedb.searchTv({query:req.body.info})
      res.status(200).json(response)
    }

     
    } catch (e) {
      console.log(e)
    }
})
const trending_movie = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const allResults = []
    for (let page = 1; page < 5; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();

      if (data.results) {
        allResults.push(...data.results);
      }
    }
     
    
      res.status(200).json(allResults)
      
    } catch (e) {
      console.log(e)
    }
  
})

  export{
    search_movie,
    details,
    fetch_image,
    fetch_similar,
    fetch_reviews,
    fetch_cast,
    fetch_search,
    trending_movie
  }