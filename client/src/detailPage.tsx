import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Star, XIcon } from "lucide-react";
import { DateTime } from "luxon";
import Description from "./description";
import Photos from "./photos";
import Similar from "./similar";
import { Link } from "react-router-dom";
import Reviews from "./reviews";
import Cast from "./cast";
import { SignedIn, SignedOut, RedirectToSignUp, useUser } from "@clerk/clerk-react";


const Details = () => {
  const location = useLocation();
  const info = location.state;
  const [detailedInfo, setDetailedInfo] = useState<any>();
  const [currentPage, setCurrentPage] = useState("Description");
  const [ratingBool, setRatingBool] = useState(false)
  const [rating, setRating] = useState<number>()
  const [hover, setHover] = useState<any>()
  const [reviewInfo, setReviewInfo] = useState<any>()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [reviewConfirm, setReviewConfirm] = useState(false)
  const {user} = useUser()
  


  const handleReviewFetch = async(item: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/fetch_detail_review`,
        { item, user }
      );
      setReviewInfo(response.data[0]);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  const handleClick = async (item: any) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/details`,
        { item }
      );
      setDetailedInfo(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    
    handleClick(info);
    window.scrollTo(0,0)
    setCurrentPage("Description")

    if(user){
      handleReviewFetch(info)
    }
  }, [info, reviewInfo, reviewConfirm]);
  

  const handlePageChange = (e: any) => {
    setCurrentPage(e.target.innerText);
    
  }
  const handleRateClick = async() => {
   try{
     await axios.post(`${import.meta.env.VITE_API}/save_review`, {user, rating, detailedInfo})
    

    setReviewConfirm(true)
    setTimeout(() => {
      setReviewConfirm(false)
    },5000)
   }
    catch(e) {console.log(e)}
  }
  const showPage = () => {
    switch (currentPage) {
      case "Description":
        return <Description state={detailedInfo} />
        break;
        case "Photos":
        return <Photos state={info}/>
        break;
        case "Similar":
        return <Similar state={info}/>
        break;
        case "Reviews":
        return <Reviews state={info}/>
        break;
        case "Cast":
          return <Cast state={info}/>
          break;
    
      default:
        return <Description/>
        break;
    }
  }
  useEffect(()=>{
    showPage()
  },[currentPage])

  const handleTitleSize = (title: any) => {
    if(title.length > 30){
      return "45px"
    }else if(title.length >=20 && title.length <= 25){
      return "80px"
    }
    else if(title.length >25){
      return "70px"
    }
    else{
      return "90px"
    }
  }

  const handleDelete = async() => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/delete_review`,
        { detailedInfo, user }
      );

      setDeleteConfirm(true)
      setTimeout(() => {
        setDeleteConfirm(false)
      },5000)
      
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }


  let dt;
  detailedInfo
    ? (dt = DateTime.fromISO(
        detailedInfo.release_date || detailedInfo.first_air_date
      ))
    : (dt = "no");

  let sm = dt.toLocaleString(DateTime.DATE_MED);


  const handleRatingClick = () => {
    setRatingBool(!ratingBool)
  }
  
  return (
    <div className="min-h-screen bg-first relative">
    
      {detailedInfo && (
        <div 
          className={`h-screen relative bg-cover grid grid-cols-custom  grid-rows-12 justify-center before:absolute before:inset-0 before:bg-black before:opacity-30 ${ratingBool ? "overflow-hidden": ""}`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detailedInfo.backdrop_path})`,
          
           
          }}
          
        >
           {ratingBool && (
             <div className="absolute inset-0 bg-black bg-opacity-40 z-40"></div>
            )}
          <div className="flex justify-center gap-20 row-start-2 text-white col-start-6">
            <Link to="/popmovies"><h2 className="ts2 z-50">MOVIES</h2></Link>
            <Link to="/poptv"><h2 className="whitespace-nowrap ts2 z-50">TV SHOWS</h2></Link>
            <Link to="#"><h2 className="ts2 z-50">NEWS</h2></Link>
          </div>
          <div className="row-start-5 flex flex-col gap-10 col-start-1 relative">
            <div className="flex flex-col col-span-2">
              <h1 className= "lemon  tracking-wider whitespace-nowrap text-white ts2 cus"
              style={{fontSize:handleTitleSize(detailedInfo.title || detailedInfo.name)}}>
                {detailedInfo.title ? detailedInfo.title : detailedInfo.name}
              </h1>
              <ul className="flex gap-5">
                {detailedInfo.genres &&
                  detailedInfo.genres.map((item: any) => (
                    <li
                      className="whitespace-nowrap b ts2 text-white" 
                      key={item.id}
                     
                    >
                      {item.name.toUpperCase()}
                    </li>
                  ))}
              </ul>
            </div>
            <button
              className="bg-acc pl-8 pr-4 py-[14px] rounded-full flex gap-5 whitespace-nowrap absolute top-[220px] text-xl b font-black items-center"
              onClick={handleRatingClick}
            >
              <p className="tracking-wider">Your Rating</p>
              <div className="flex items-center gap-2">
              <Star/>
              {reviewInfo &&
               <p>{reviewInfo.rating}/10</p>
              }
              </div>
            </button>
          </div>
          <div className="row-start-11">
            <p className="text-acc whitespace-nowrap b text-xl font-bold tracking-widest ts2 z-50">
              {sm}
            </p>
          </div>
          
          { ratingBool &&
          <div>
          <SignedIn>
              <div className="bg-first w-[500px] h-[275px] absolute abs rounded-lg z-50">
                <div className="flex flex-col pt-10 pl-8 gap-7 w-fit">
                <h2 className="text-2xl  font-bold text-sec">Select your rating</h2>
                <div className="flex flex-col gap-7">
                  <div className="flex">
                 {[...Array(10)].map((star, index) => {
                  const ratingVal = index + 1
                  return (
                    <label key={index}>
                      <input 
                      type="radio"
                      name="rating"
                      className="hidden"
                      value={ratingVal}
                      onClick={() => setRating(ratingVal)}
                      
                      />
                      <Star
                      size={40}
                      className="star "
                      fill={ratingVal <= (hover || rating) ? "#c03221" : "#222222"}
                      color={ratingVal <= (hover || rating) ? "" : "gray"}
                      onMouseEnter={() => setHover(ratingVal)}
                      onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  )
                 })}
                 </div>
                   <div className="w-full">
                    
                    <button className="w-full bg-acc py-[6px] rounded-full" onClick={handleRateClick}>Rate</button>
                    <button className="p-1 bg-white rounded-md mt-3" onClick={handleDelete}>Delete review</button>
                  </div>
                  </div>
                
                  </div>
                  <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setRatingBool(false)}>
                    <XIcon color="white" />
                  </div>
                 
              </div>
              </SignedIn>
              <SignedOut> <RedirectToSignUp/></SignedOut>
              </div>
            }
            
          <div className="w-full col-span-full bg-first shad absolute z-30 text-sec row-start-12 h-fit">
            <ul className="grid grid-cols-5 justify-items-center items-center pt-7">
              <li className={`${currentPage == "Description" && 'border-b border-red-400'}`} onClick={(e) => handlePageChange(e)}>Description</li>
              <li className={`${currentPage == "Photos" && 'border-b border-red-400'}`} onClick={(e) => handlePageChange(e)}> Photos</li>
              <li className={`${currentPage == "Similar" && 'border-b border-red-400'}`} onClick={(e) => handlePageChange(e)}> Similar</li>
              <li className={`${currentPage == "Reviews" && 'border-b border-red-400'}`} onClick={(e) => handlePageChange(e)}> Reviews</li>
              <li className={`${currentPage == "Cast" && 'border-b border-red-400'}`} onClick={(e) => handlePageChange(e)}> Cast</li>
            </ul>
            <div className="px-16 py-10">
             {showPage()}
            </div>
          </div>
      </div>
        
      )}
      {
        deleteConfirm &&
        <div className="absolute top-0 right-5 bg-red-500">Review successfully deleted!</div>
      }
       {
        reviewConfirm &&
        <div className="absolute top-0 right-5 bg-red-500">Review successfully created!</div>
      }
      
    </div>
  );
};

export default Details;
