import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllTimeMovie = () => {

    const [info, setInfo] = useState<any[]>([])
  

    const fetchPopular = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API}/alltimemovies`);
         console.log(response)
          setInfo(response.data.results)
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      };
    useEffect(()=>{
        fetchPopular();
    },[])

    
    return(
        <>
        <h1 className="text-lg py-8 cool font-bold tracking-widest text-vour ">ALL TIME POPULAR MOVIES</h1>
        <ul className="w-full flex justify-between">
  {info &&
    info.slice(0, 6).map((item: any) => (
      <Link to={`/${item.id}`} key={item.id}  state={item}>
      <li
        key={item.id}
        className="w-[185px] h-[265px]  box-border rounded-md hover:cursor-pointer shad3 hover:scale-105">
        <img
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          alt=""
          className="w-full h-full rounded-md"
        />
      </li>
      </Link>
    ))}
</ul>

        </>
    
    )
}
export default AllTimeMovie