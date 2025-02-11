import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import Navbar from "./navbar"
import { DateTime } from "luxon"
import { Link } from "react-router-dom"

const Search = () => {
const location = useLocation()
const { info } = location.state
const [type, setType] = useState(location.state.media_type)
const [res, setRes] = useState<any[]>([])
    const fetchSearch = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/search`, {info, type})
            console.log(response.data.results)
            setRes(response.data.results)
        }catch(e){
            console.error(e)
        }
    }
   
        useEffect(() => {
            fetchSearch()
            
        },[type])

        const handleClick = (arg: any) => {
            console.log(arg)
            setType(arg)
        }

        return(
            <>
            <Navbar></Navbar>
            <div  className="grid grid-cols-custom justify-center gap-x-[20px] py-14">
                <div className="row-start-1 col-start-1">
                    <h2 className="border-b border-black mb-2">Filters</h2>
                    <p onClick={() => handleClick("movie")}>Movies</p>
                    <p onClick={() => handleClick("tv")}>TV Shows</p>
                </div>
                <div className="flex flex-col gap-10 col-start-3 col-span-6">
                    <p className="whitespace-nowrap">Showing results for "{info}"</p>
            {res &&
            res.map((item: any) => (
                <div className="flex gap-5 col-span-2" key={item.id}>
                {item.poster_path ? (
   
   <Link to={`/${item.id}`} state={item}><img 
        src={`https://image.tmdb.org/t/p/original${item.poster_path}`} 
        alt={`${item.title} poster`} 
        className="w-24 h-32 " 
    />
    </Link>
) : (
    <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">
        <p>No Image</p>
    </div>
)}
                <div className="flex gap-2">
                    <Link to={`/${item.id}`} state={item} className="self-start"><p className="whitespace-nowrap">{item.title || item.name}</p></Link>
                    <p className="whitespace-nowrap">{DateTime.fromISO(item.release_date || item.first_air_date).toFormat('yyyy')}</p>
                </div>
                </div>
            ))
            }
            </div>
            </div>
            </>
        )
}
export default Search