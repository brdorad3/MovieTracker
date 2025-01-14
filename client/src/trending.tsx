import "dotenv"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Trending = () => {

  const [info, setInfo] = useState<any[]>([])
  const [detailedInfo, setDetailedInfo] = useState()

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

    const handleClick = async(item: any) => {
      try{
        console.log(item)
        const response = await axios.post(`${import.meta.env.VITE_API}/details`, {item});
        setDetailedInfo(response.data)
      }catch (error){
        console.error("Error fetching data", error)
      }
    }

    return(
        <>
        <h1 className="text-2xl py-8 b font-bold">Trending</h1>
        <ul className="w-full flex justify-between">
  {info &&
    info.slice(0, 6).map((item: any) => (
      <Link to={`/${item.id}`} key={item.id}  state={item} onClick = {() => handleClick(item)}>
      <li
        key={item.id}
        className="w-48 h-64 bg-black box-border rounded-lg hover:outline hover:outline-4 hover:outline-black hover:cursor-pointer ">
        <img
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          alt=""
          className="w-full h-full rounded-lg"
        />
      </li>
      </Link>
    ))}
</ul>

        </>
    )
}
export default Trending