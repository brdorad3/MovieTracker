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
    const [yearFetch, setYearFetch] = useState(0)
    const [genreFetch, setGenreFetch] = useState("")
    const [sortFetch, setSortFetch] = useState("Popularity")
    

    const fetchMovies = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/trending_movies`, {yearFetch, genreFetch, sortFetch});
            console.log(response.data)
            setInfo(response.data)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        fetchMovies()
    },[yearFetch, genreFetch, sortFetch])

    const handleClick = (e:any) => {
       
        setYearFetch(e.target.innerText)
    }
    const handleGenreClick = (e:any) => {
        
        setGenreFetch(e.target.innerText)
    }
    const handleSortClick = (e:any) => {
        
        setSortFetch(e.target.innerText)
    }
    const handleBgColor = (item: any) => {
        if(item > 6 && item < 7){
            return "yellow"
        }else if(item > 7 && item < 8){
            return "orange"
        }
        else if(item > 8 && item < 9){
            return "lime"
        }
        else if(item > 9 && item < 10){
            return "green"
        }
        else if(item < 6){
            return "red"
        }
    }

    return(
        <>
        <Navbar/>
        <div className="px-[313px] py-5">
            <div className="w-full border-b border-black flex justify-between">
            <h1>Popular movies</h1>
            <div className="flex gap-5">
                <div className="relative year">
                    
                <h2 className="flex items-center" onMouseOver={() => setYr(true)} onMouseOut={() => setYr(false)}>Year <ChevronDown  size={16}/></h2>
                {yr &&
                <div className="p-2 bg-white shad absolute top-0 rounded-lg z-10" onMouseOver={() => setYr(true)} onMouseOut={() => setYr(false)}>
                    <div className="flex gap-10 items-center relative text-sm" onMouseOver={() => setTwens(true)} onMouseOut={() => setTwens(false)}>2020s <ChevronRight size={15} />
                    {twens && 
                    <div className="absolute top-0 -right-6 bg-white p-2 shad z-20 rounded-md" onMouseOver={() => setTwens(true)} onMouseOut={() => setTwens(false)}>
                        <p onClick={(e) => handleClick(e)}>2025</p>
                        <p onClick={(e) => handleClick(e)}>2024</p>
                        <p onClick={(e) => handleClick(e)}>2023</p>
                        <p onClick={(e) => handleClick(e)}>2022</p>
                        <p onClick={(e) => handleClick(e)}>2021</p>
                        <p onClick={(e) => handleClick(e)}>2020</p>
                    </div>
                    }
                    </div>
                    
                    <div className="flex gap-10 items-center relative text-sm" onMouseOver={() => setTens(true)} onMouseOut={() => setTens(false)}>2010s <ChevronRight size={15}/>
                    
                    {tens && 
                    <div className="absolute top-0 -right-6 bg-white p-2 shad z-20 rounded-md" onMouseOver={() => setTens(true)} onMouseOut={() => setTens(false)}>
                        <p onClick={(e) => handleClick(e)}>2019</p>
                        <p onClick={(e) => handleClick(e)}>2018</p>
                        <p onClick={(e) => handleClick(e)}>2017</p>
                        <p onClick={(e) => handleClick(e)}>2016</p>
                        <p onClick={(e) => handleClick(e)}>2015</p>
                        <p onClick={(e) => handleClick(e)}>2014</p>
                        <p onClick={(e) => handleClick(e)}>2013</p>
                        <p onClick={(e) => handleClick(e)}>2012</p>
                        <p onClick={(e) => handleClick(e)}>2011</p>
                        <p onClick={(e) => handleClick(e)}>2010</p>                    
                    </div>
                    }
                    
                    </div>
                   
                   
                    <div className="flex gap-10 items-center relative text-sm" onMouseOver={() => setOos(true)} onMouseOut={() => setOos(false)}>2000s <ChevronRight size={15}
                    
                    />
                    {oos && 
                    <div className="absolute top-0 -right-6 bg-white p-2 shad z-20 rounded-md" onMouseOver={() => setOos(true)} onMouseOut={() => setOos(false)}>
                        <p onClick={(e) => handleClick(e)}>2009</p>
                        <p onClick={(e) => handleClick(e)}>2008</p>
                        <p onClick={(e) => handleClick(e)}>2007</p>
                        <p onClick={(e) => handleClick(e)}>2006</p>
                        <p onClick={(e) => handleClick(e)}>2005</p>
                        <p onClick={(e) => handleClick(e)}>2004</p>
                        <p onClick={(e) => handleClick(e)}>2003</p>
                        <p onClick={(e) => handleClick(e)}>2002</p>
                        <p onClick={(e) => handleClick(e)}>2001</p>
                        <p onClick={(e) => handleClick(e)}>2000</p>                    
                    </div>
                    }
                    
                    </div>
                    
                    <div className="flex gap-10 items-center relative text-sm" onMouseOver={() => setNines(true)} onMouseOut={() => setNines(false)}>1990s <ChevronRight size={15}/>
                    
                    {nines && 
                    <div className="absolute top-0 -right-6 bg-white p-2 shad z-20 rounded-md" onMouseOver={() => setNines(true)} onMouseOut={() => setNines(false)}>
                        <p onClick={(e) => handleClick(e)}>1999</p>
                        <p onClick={(e) => handleClick(e)}>1998</p>
                        <p onClick={(e) => handleClick(e)}>1997</p>
                        <p onClick={(e) => handleClick(e)}>1996</p>
                        <p onClick={(e) => handleClick(e)}>1995</p>
                        <p onClick={(e) => handleClick(e)}>1994</p>
                        <p onClick={(e) => handleClick(e)}>1993</p>
                        <p onClick={(e) => handleClick(e)}>1992</p>
                        <p onClick={(e) => handleClick(e)}>1991</p>
                        <p onClick={(e) => handleClick(e)}>1990</p>                    
                    </div>
                    }
                    
                    
                    </div>
                    <div className="flex gap-10 items-center relative text-sm" onMouseOver={() => setEits(true)} onMouseOut={() => setEits(false)}>1980s <ChevronRight size={15}/>
                    
                    {eits && 
                    <div className="absolute top-0 -right-6 bg-white p-2 shad z-20 rounded-md" onMouseOver={() => setEits(true)} onMouseOut={() => setEits(false)}>
                        <p onClick={(e) => handleClick(e)}>1989</p>
                        <p onClick={(e) => handleClick(e)}>1988</p>
                        <p onClick={(e) => handleClick(e)}>1987</p>
                        <p onClick={(e) => handleClick(e)}>1986</p>
                        <p onClick={(e) => handleClick(e)}>1985</p>
                        <p onClick={(e) => handleClick(e)}>1984</p>
                        <p onClick={(e) => handleClick(e)}>1983</p>
                        <p onClick={(e) => handleClick(e)}>1982</p>
                        <p onClick={(e) => handleClick(e)}>1981</p>
                        <p onClick={(e) => handleClick(e)}>1980</p>                    
                    </div>
                    }
                    
                    </div>
                </div>
                }
                </div>
                <div className="relative">
                <h2 className="flex items-center" onMouseOver={() => setGr(true)} onMouseOut={() => setGr(false)}>Genre <ChevronDown  size={16}/></h2>
                {gr &&
                <div className="absolute top-0 left-0 bg-white shad genre" onMouseOver={() => setGr(true)} onMouseOut={() => setGr(false)}>
                    <h3 className="border-b border-black">Genre</h3>
                    <p onClick={(e) => handleGenreClick(e)}>Action</p>
                    <p onClick={(e) => handleGenreClick(e)}>Adventure</p>
                    <p onClick={(e) => handleGenreClick(e)}>Animation</p>
                    <p onClick={(e) => handleGenreClick(e)}>Comedy</p>
                    <p onClick={(e) => handleGenreClick(e)}>Crime</p>
                    <p onClick={(e) => handleGenreClick(e)}>Documentary</p>
                    <p onClick={(e) => handleGenreClick(e)}>Drama</p>
                    <p onClick={(e) => handleGenreClick(e)}>Family</p>
                    <p onClick={(e) => handleGenreClick(e)}>Fantasy</p>
                    <p onClick={(e) => handleGenreClick(e)}>History</p>
                    <p onClick={(e) => handleGenreClick(e)}>Horror</p>
                    <p onClick={(e) => handleGenreClick(e)}>Music</p>
                    <p onClick={(e) => handleGenreClick(e)}>Mystery</p>
                    <p onClick={(e) => handleGenreClick(e)}>Romance</p>
                    <p onClick={(e) => handleGenreClick(e)}>Sci fi</p>
                    <p onClick={(e) => handleGenreClick(e)}>Thriller</p>
                    <p onClick={(e) => handleGenreClick(e)}>War</p>
                    <p onClick={(e) => handleGenreClick(e)}>Western</p>
                </div>
                }
                </div>
                <div className="relative">
                <h2 className="flex items-center" onMouseOver={() => setSr(true)} onMouseOut={() => setSr(false)}>Sort by <ChevronDown  size={16}/></h2>
                {sr &&
                <div className="p-2 absolute top-0 bg-white shad rounded-sm" onMouseOver={() => setSr(true)} onMouseOut={() => setSr(false)}>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Popularity</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Rating</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Rating count</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Title desc</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Title asc</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Revenue</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Date desc</p>
                <p className="text-sm whitespace-nowrap hover:cursor-pointer" onClick={(e) => handleSortClick(e)}>Date asc</p>
                </div>
                }
                </div>
            </div>
            </div>
            <div className="grid grid-cols-5 gap-y-20 py-10">
                {info &&
                info.map((item: any, index) => (
                    <div key={index} className="flex flex-col relative">
                        <div className="absolute -top-3 left-[75px] w-12 h-8 rounded-full bg-orange-600 flex justify-center items-center"
                        style={{backgroundColor: handleBgColor(item.vote_average)}}
                        >
                            <p>{item.vote_average.toFixed(1)}</p>
                        </div>
                        <Link to={`/:${item.id}`} state={item}><img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="poster" className="w-48 h-64 rounded-sm" /></Link>
                        <div>
                            <Link to={`/:${item.id}`} state={item} ><p className="b font-bold text-lg">{item.title}</p></Link>
                           
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default PopMovies