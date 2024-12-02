import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { PlayCircle } from "lucide-react";
import { DateTime } from "luxon";
import  ColorThief  from "colorthief"



const Details = (props: any) => {
  const location = useLocation();
  const info = location.state;
  const [detailedInfo, setDetailedInfo] = useState<any>();
  const [dominantColor, setDominantColor] = useState<string | null>(null);


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
  }, []);



  let dt;
  detailedInfo
    ? (dt = DateTime.fromISO(
        detailedInfo.release_date || detailedInfo.first_air_date
      ))
    : (dt = "no");

  let sm = dt.toLocaleString(DateTime.DATE_MED);

  useEffect(() => {
    if (detailedInfo?.backdrop_path) {
      // Load the image programmatically for ColorThief
      const image = new Image();
      
      let googleProxyURL = "https://corsproxy.io/?";
      let ima = `https://image.tmdb.org/t/p/original${detailedInfo.backdrop_path}`;
      image.crossOrigin = 'anonymous';
      image.src = googleProxyURL + encodeURIComponent(ima);
      image.onload = () => {
        const colorThief = new ColorThief();
        const dominant = colorThief.getColor(image); // Extract dominant color
        setDominantColor(`rgb(${dominant[0]}, ${dominant[1]}, ${dominant[2]})`);
      };
    }
  }, [detailedInfo]);

  dominantColor && console.log(dominantColor)

  return (
    <>
      {detailedInfo && (
        <div
          className="w-full h-full relative bg-cover grid grid-cols-custom grid-rows-12 justify-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detailedInfo.backdrop_path})`,
            
          }}
        >
          <div className="flex justify-center gap-20 row-start-2 text-white col-start-6">
            <h2>MOVIES</h2>
            <h2 className="whitespace-nowrap">TV SHOWS</h2>
            <h2>NEWS</h2>
          </div>
          <div className="row-start-5 flex flex-col gap-10 col-start-1 relative">
            <div className="flex flex-col col-span-2">
              <h1
                className="lemon text-[90px] tracking-wider whitespace-nowrap text-white"
                
              >
                {detailedInfo.title ? detailedInfo.title : detailedInfo.name}
              </h1>
              <ul className="flex gap-5">
                {detailedInfo.genres &&
                  detailedInfo.genres.map((item: any) => (
                    <li
                      className="whitespace-nowrap b  text-white" 
                      key={item.id}
                     
                    >
                      {item.name.toUpperCase()}
                    </li>
                  ))}
              </ul>
            </div>
            <button
              className="bg-acc px-6 py-4 rounded-full flex gap-5 whitespace-nowrap absolute top-[220px] b text-xl font-bold items-center"
            >
              Watch Trailer <PlayCircle></PlayCircle>
            </button>
          </div>
          <div className="row-start-11">
            <p className="text-acc whitespace-nowrap b text-xl font-bold tracking-widest">
              {sm}
            </p>
          </div>
          <div className="col-span-full h-96 bg-white row-start-12">
            <ul className="grid grid-cols-5 justify-items-center h-16 items-center">
              <li className="border-b border-yellow">Description</li>
              <li>Photos</li>
              <li>Videos</li>
              <li>Ratings</li>
              <li>Cast</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
