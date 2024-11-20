import "dotenv"
import axios from "axios"
import { useEffect, useState } from "react"

const Trending = () => {

  const [info, setInfo] = useState<any[]>([])

    const fetchPopular = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API}/trending`);
         
          setInfo(response.data)
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      };
    useEffect(()=>{
        fetchPopular();
    },[])

    return(
        <>
        <h1 className="text-lg py-5">Trending</h1>
        <ul className="w-full flex justify-between">
             {info && 
             info.slice(0,6).map((item: any, index) => (
              <li className="w-48 h-64s bg-black rounded-2xl">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className="w-full h-full rounded-2xl"/>
              </li>
             ))
             }
               
        </ul>
        </>
    )
}
export default Trending