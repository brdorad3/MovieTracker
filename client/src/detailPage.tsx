import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { DateTime } from "luxon";
import Description from "./description";
import Photos from "./photos";
import Similar from "./similar";
import Reviews from "./reviews";
import Cast from "./cast";


const Details = () => {
  const location = useLocation();
  const info = location.state;
  const [detailedInfo, setDetailedInfo] = useState<any>();
  const [currentPage, setCurrentPage] = useState("Description");
  const [ratingBool, setRatingBool] = useState(false)
  const [rating, setRating] = useState<number>()
  const [hover, setHover] = useState<any>()

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
  }, [info]);
  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  const handlePageChange = (e: any) => {
    setCurrentPage(e.target.innerText);
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
    <>
      {detailedInfo && (
        <div 
          className={`w-full h-full  relative bg-cover grid grid-cols-custom  grid-rows-12 justify-center before:absolute before:inset-0 before:bg-black before:opacity-30 ${ratingBool ? "overflow-hidden": ""}`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detailedInfo.backdrop_path})`,
            
           
          }}
        >
           {ratingBool && (
             <div className="absolute inset-0 bg-black bg-opacity-50 z-40"></div>
            )}
          <div className="flex justify-center gap-20 row-start-2 text-white col-start-6">
            <h2 className="ts2 z-50">MOVIES</h2>
            <h2 className="whitespace-nowrap ts2 z-50">TV SHOWS</h2>
            <h2 className="ts2 z-50">NEWS</h2>
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
              <Star/>
            </button>
          </div>
          <div className="row-start-11">
            <p className="text-acc whitespace-nowrap b text-xl font-bold tracking-widest ts2 z-50">
              {sm}
            </p>
          </div>
          <div className="col-span-full h-96 bg-white row-start-12 z-30">
            <ul className="grid grid-cols-5 justify-items-center h-16 items-center">
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
          { ratingBool &&
              <div className="bg-sec w-[600px] h-[300px] absolute abs shadcus rounded-lg z-50">
                <h2 className="text-lg font-bold">Select you rating</h2>
                <div className="flex">
                 {[...Array(10)].map((star, index) => {
                  const ratingVal = index + 1
                  return (
                    <label>
                      <input 
                      type="radio"
                      name="rating"
                      className="hidden"
                      value={ratingVal}
                      onClick={() => setRating(ratingVal)}
                      />
                      <Star
                      className="star"
                      color={ratingVal <= (hover || rating) ? "yellow" : "gray"}
                      onMouseEnter={() => setHover(ratingVal)}
                      onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  )
                 })}
                  </div>
                  <div className="absolute top-5 right-5" onClick={() => setRatingBool(false)}>
                    x
                  </div>
              </div>
            }
        </div>
      )}
    </>
  );
};

export default Details;
