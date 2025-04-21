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
      console.log(response.data)
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

  
  if (ratingBool) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `17px`;
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }


  useEffect(()=>{
    showPage()
  },[currentPage])

  const handleTitleSize = (title: any) => {
    if(title.length > 40){
      return "40px"
    }
    else if(title.length > 30 && title.length <= 40){
      return "55px"
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
      setRating(0)
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
          <div className="flex justify-center gap-20 row-start-1 items-end text-white opacity-80 col-start-6 z-10">
            <Link to="/popmovies"><h2 className="ts2 z-50 cursor-pointer">MOVIES</h2></Link>
            <Link to="/poptv"><h2 className="whitespace-nowrap ts2 z-50">TV SHOWS</h2></Link>
            <Link to="#"><h2 className="ts2 z-50">NEWS</h2></Link>
          </div>
          <div className="row-start-5 flex flex-col gap-10 col-start-1 relative col-span-full ">
            <div className="flex flex-col ">
              <h1 className= "lemon grid tracking-wider whitespace-nowrap text-white ts2 cus"
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
            <p className="text-acc whitespace-nowrap cool ts2 text-xl tracking-widest z-50">
              {sm}
            </p>
          </div>
          
          { ratingBool &&
          <div>
          <SignedIn>
              <div className="bg-first w-fit h-fit absolute abs rounded-sm z-50">
                <div className="flex justify-between py-5 px-5 border-b border-sec">
                <h2 className="text-xl  font-bold text-sec mont ">Select your rating</h2>
                <div className="cursor-pointer" onClick={() => setRatingBool(false)}>
                    <XIcon color="white" />
                  </div>
              
              </div>
                <div className="flex gap-7 py-10 px-10">
                  <div className="flex">
                  <img className="w-36 h-52 rounded-sm shad" src={`https://image.tmdb.org/t/p/original${detailedInfo.poster_path}`} alt="poster" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-6">
                  <h2 className="text-sec text-xl pop">{detailedInfo.title || detailedInfo.name}</h2>
                  <div className="flex gap-[1px]">
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
                      size={35}
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
                 </div>
                   <div className="w-full flex justify-end gap-2">
                    <button className="py-1 px-2 bg-white rounded-md pop" onClick={handleDelete}>Delete review</button>
                    <button className="bg-acc py-1 px-2 rounded-md pop shad " onClick={handleRateClick}>Rate</button>
                    
                  </div>
                  </div>
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
        <div className="absolute top-10 right-10 bg-red-500 p-3 rounded-lg">Review successfully deleted!</div>
      }
       {
        reviewConfirm &&
        <div className="absolute top-10 right-10 bg-red-500 p-3 rounded-lg">Review successfully created!</div>
      }
      
    </div>
  );
};

export default Details;
