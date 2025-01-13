import Navbar from "./navbar"
import axios from "axios"
import { useState, useEffect } from "react"
import { DateTime } from "luxon"
import { Link } from "react-router-dom"
import { ChevronDown, ChevronRight, Divide } from "lucide-react"

const PopMovies = () => {
    const [info, setInfo] = useState<any[]>([])
    const [yr, setYr] = useState(false)
    const [gr, setGr] = useState(false)
    const [sr, setSr] = useState(false)
    const [twens, setTwens] = useState(false)
    const [tens, setTens] = useState(false)
    const [oos, setOos] = useState(false)
    const [nines, setNines] = useState(false)
    const [eits, setEits] = useState(false)
    

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
        <div className="px-[313px] py-5">
            <div className="w-full border-b border-black flex justify-between">
            <h1>Popular movies</h1>
            <div className="flex gap-5">
                <div className="relative">
                    
                <h2 className="flex items-center" onMouseOver={() => setYr(true)} onMouseOut={() => setYr(false)}>Year <ChevronDown  size={16}/></h2>
                {yr &&
                <div className="p-2 bg-white shad absolute top-0 rounded-lg z-10" onMouseOver={() => setYr(true)} onMouseOut={() => setYr(false)}>
                    <div className="flex gap-10 items-center relative" onMouseOver={() => setTwens(true)} onMouseOut={() => setTwens(false)}>2020s <ChevronRight size={15} /></div>
                    {twens && 
                    <div className="absolute top-0 -right-6 bg-white p-2 shad z-20 rounded-md" onMouseOver={() => setTwens(true)} onMouseOut={() => setTwens(false)}>
                        <p>2025</p>
                        <p>2024</p>
                        <p>2023</p>
                        <p>2022</p>
                        <p>2021</p>
                        <p>2020</p>
                    
                    </div>
                    }
                    <div className="flex gap-10 items-center relative" onMouseOver={() => setTens(true)} onMouseOut={() => setYr(false)}>2010s <ChevronRight size={15}/></div>
                    <div className="flex gap-10 items-center relative" onMouseOver={() => setOos(true)} onMouseOut={() => setYr(false)}>2000s <ChevronRight size={15}/></div>
                    <div className="flex gap-10 items-center relative" onMouseOver={() => setNines(true)} onMouseOut={() => setYr(false)}>1990s <ChevronRight size={15}/></div>
                    <div className="flex gap-10 items-center relative" onMouseOver={() => setEits(true)} onMouseOut={() => setYr(false)}>1980s <ChevronRight size={15}/></div>
                </div>
                }
                </div>
                <div className="relative">
                <h2 className="flex items-center" onMouseOver={() => setGr(true)} onMouseOut={() => setGr(false)}>Genre <ChevronDown  size={16}/></h2>
                {gr &&
                <div className="w-20 h-20 bg-black absolute top-0" onMouseOver={() => setGr(true)} onMouseOut={() => setGr(false)}></div>
                }
                </div>
                <div className="relative">
                <h2 className="flex items-center" onMouseOver={() => setSr(true)} onMouseOut={() => setSr(false)}>Sort by <ChevronDown  size={16}/></h2>
                {sr &&
                <div className="w-20 h-20 bg-black absolute top-0" onMouseOver={() => setSr(true)} onMouseOut={() => setSr(false)}></div>
                }
                </div>
            </div>
            </div>
            <div className="flex flex-col gap-5 py-5">
                {info &&
                info.map((item: any, index) => (
                    <div key={index} className="flex gap-3">
                        <Link to={`/:${item.id}`} state={item}><img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="poster" className="w-20 h-28 rounded-md" /></Link>
                        <div>
                            <Link to={`/:${item.id}`} state={item} ><p className="b font-bold text-lg">{index + 1}. {item.title}</p></Link>
                            <p>{DateTime.fromISO(item.release_date).year}</p>
                            <p>{item.vote_average.toFixed(1)}/10  &#40;{item.vote_count}&#41;</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default PopMovies