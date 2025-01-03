import Navbar from "./navbar"
import axios from "axios"
import { useState, useEffect } from "react"

const PopMovies = () => {
    const [info, setInfo] = useState<any[]>([])

    const fetchMovies = async() => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API}/trending_movies`);
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
        <div className="px-[313px]">
            <div className="w-full border-b border-black">
            <h1>Popular movies</h1>
            </div>
            <div>
                {info &&
                info.map((item: any) => (
                    <div key={item.id}>
                        <img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="poster" className="w-20 h-28" />
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default PopMovies