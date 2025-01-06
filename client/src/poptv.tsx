import Navbar from "./navbar"
import axios from "axios"
import { useState, useEffect } from "react"
import { DateTime } from "luxon"
import { Link } from "react-router-dom"

const PopTv = () => {
    const [info, setInfo] = useState<any[]>([])

    const fetchMovies = async() => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/trending_tv`);
            console.log(response.data)
            setInfo(response.data)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        fetchMovies()
    },[])


    return(
        <>
        <Navbar/>
        <div className="px-[313px] py-5">
            <div className="w-full border-b border-black flex justify-between">
            <h1>Popular Tv shows</h1>
            <div className="flex gap-5">
                <h2>Year</h2>
                <h2>Genre</h2>
                <h2>Sort by</h2>
            </div>
            </div>
            <div className="flex flex-col gap-5 py-5">
                {info &&
                info.map((item: any, index) => (
                    <div key={index} className="flex gap-3">
                        <Link to={`/:${item.id}`} state={item}><img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="poster" className="w-20 h-28 rounded-md" /></Link>
                        <div>
                            <Link to={`/:${item.id}`} state={item} ><p className="b font-bold text-lg">{index + 1}. {item.name}</p></Link>
                            <p>{DateTime.fromISO(item.first_air_date).year}</p>
                            <p>{item.vote_average.toFixed(1)}/10  &#40;{item.vote_count}&#41;</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default PopTv