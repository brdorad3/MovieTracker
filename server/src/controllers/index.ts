import "dotenv/config"

import { MovieDb } from 'moviedb-promise'
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import Review from "../models/review"

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
    if(req.body.type == "movie"){
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
    const yearFetch = req.body.yearFetch
    const genreFetch = req.body.genreFetch
    const sortFetch = req.body.sortFetch
    const handleGenre = (num: any) => {
      if(num == "Action") return 28
      else if(num == "Adventure") return 12
      else if(num == "Animation") return 16
      else if(num == "Comedy") return 35
      else if(num == "Crime") return 80
      else if(num == "Documentary") return 99
      else if(num == "Drama") return 18
      else if(num == "Family") return 10751
      else if(num == "Fantasy") return 14
      else if(num == "History") return 36
      else if(num == "Horror") return 27
      else if(num == "Music") return 10402
      else if(num == "Mystery") return 9648
      else if(num == "Romance") return 10749
      else if(num == "Sci fi") return 878
      else if(num == "Thriller") return 53
      else if(num == "War") return 10752
      else if(num == "Western") return 37
      else if(num == "") return;
      
    }
    const handleSort = (sort: any) => {
      if(sort == "Popularity") return "popularity.desc"
      else if(sort == "Rating") return "vote_average.desc"
      else if(sort == "Rating count") return "vote_count.desc"
      else if(sort == "Title asc") return "title.asc"
      else if(sort == "Title desc") return "title.desc"
      else if(sort == "Revenue") return "revenue.desc"
      else if(sort == "Date desc") return "primary_release_date.desc"
      else if(sort == "Date asc") return "primary_release_date.asc"
      
    }
    
    for (let page = 1; page < 5; page++) {
      let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${process.env.API_KEY}&vote_count.gte=150&page=${page}`;

      
      if (yearFetch) {
        url += `&primary_release_year=${yearFetch}`;
      }
      if(sortFetch){
        url += `&sort_by=${handleSort(sortFetch)}`
      }

      
      if (genreFetch) {
        const genreId = handleGenre(genreFetch);
        if (genreId) {
          url += `&with_genres=${genreId}`;
        }
      }
      const response = await fetch(url);
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
const trending_tv = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const allResults = []
    const yearFetch = req.body.yearFetch
    const genreFetch = req.body.genreFetch
    const sortFetch = req.body.sortFetch
    const handleGenre = (num: any) => {
      if(num == "Action") return 28
      else if(num == "Adventure") return 12
      else if(num == "Animation") return 16
      else if(num == "Comedy") return 35
      else if(num == "Crime") return 80
      else if(num == "Documentary") return 99
      else if(num == "Drama") return 18
      else if(num == "Family") return 10751
      else if(num == "Fantasy") return 14
      else if(num == "History") return 36
      else if(num == "Horror") return 27
      else if(num == "Music") return 10402
      else if(num == "Mystery") return 9648
      else if(num == "Romance") return 10749
      else if(num == "Sci fi") return 878
      else if(num == "Thriller") return 53
      else if(num == "War") return 10752
      else if(num == "Western") return 37
      else if(num == "") return;
      
    }
    const handleSort = (sort: any) => {
      if(sort == "Popularity") return "popularity.desc"
      else if(sort == "Rating") return "vote_average.desc"
      else if(sort == "Rating") return "vote_average.desc"
      else if(sort == "Rating count") return "vote_count.desc"
      else if(sort == "Title asc") return "title.asc"
      else if(sort == "Title desc") return "title.desc"
      else if(sort == "Revenue") return "revenue.desc"
      else if(sort == "Date desc") return "primary_release_date.desc"
      else if(sort == "Date asc") return "primary_release_date.asc"
      
    }
    for (let page = 1; page < 5; page++) {
      let url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&api_key=${process.env.API_KEY}&vote_count.gte=150&language=en-US&page=${page}`
      
      if (yearFetch) {
        url += `&first_air_date_year=${yearFetch}`;
      }
      if(sortFetch){
        url += `&sort_by=${handleSort(sortFetch)}`
      }

      
      if (genreFetch) {
        const genreId = handleGenre(genreFetch);
        if (genreId) {
          url += `&with_genres=${genreId}`;
        }
      }



      const response = await fetch(url)
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

const toprated_movies = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
   
      const allResults = []
      for (let page = 1; page < 5; page++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=500&page=${page}`
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

const all_time_movies = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  try {
      
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&include_video=false&language=en-US&page=1&sort_by=vote_count.desc`
        );
        const data = await response.json();     
      
        res.status(200).json(data)
        
    } catch (e) {
      console.log(e)
    }
  
})

const saveReview = asyncHandler(async (req, res) => {
  try{
 const user = req.body.user.id
 const rating = req.body.rating
 const name = req.body.detailedInfo.title || req.body.detailedInfo.name 
 const url = req.body.detailedInfo.poster_path
 const id = req.body.detailedInfo.id


 const existingReview = await Review.findOne({ userId: user, movieName: name });

 if (existingReview) {
     await Review.findOneAndUpdate({movieName: name, userId: user},
         {rating: rating},
         {new: true}
         
     
     )}else{
      const review = new Review(
        {userId: user,
         name: name,
         rating: rating,
         poster_url: url,
         movieId: id
        });
    
      await review.save();
    
        res.status(200).json({ message: "Review saved", review });
     }


  }catch(e){
    res.status(500).json({ message: "Error saving review", e });
  }

});

const fetch_user_review = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

  const user = req.body.user

  const revs = await Review.find({userId: user.id})

  if(revs){
    res.status(200).json({revs})
  }
  else{
    res.status(200).json({message: "No reviews"})
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
    trending_movie,
    trending_tv,
    toprated_movies,
    all_time_movies,
    saveReview,
    fetch_user_review
  }