import Navbar from "./navbar"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"
  import { Input } from "@/components/ui/input"


const PopMovies = () => {
    const [info, setInfo] = useState<any[]>([])
    const [year, setYear] = useState()
    const [yearFetch, setYearFetch] = useState()
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

    const handleClick = (e: any) => {
        e.preventDefault()
        setYearFetch(year)
    }
    const handleYearChange = (e:any) => {
         setYear(e.target.value)
     }
    
    const handleBgColor = (item: any) => {
        if(item > 6 && item < 7){
            return "#f39c12"
        }else if(item >= 7 && item < 8){
            return "#f4d03f"
        }
        else if(item >= 8 && item < 9){
            return "#28b463"
        }
        else if(item >= 9 && item < 10){
            return "#186a3b"
        }
        else if(item < 6){
            return "#e74c3c"
        }
    }

    return(
        <>
        <Navbar/>
        <div className="px-[310px] py-10 bg-[#0D0F12]">
            <div className="w-full flex flex-col gap-10">
            <h1 className="text-gray-200 mont text-3xl">Popular Movies</h1>
            <div className="flex gap-5 items-center">
                <div className="relative flex items-center">
                <form onSubmit={(e) => handleClick(e)} className="flex items-center text-primary-foreground">
                <Input value={year} placeholder="Year" onChange={handleYearChange} maxLength={4} minLength={4} min={1970} max={2026} color="white" className="placeholder:text-white" />
                <button type="submit"> <Search type="submit" className="absolute right-2 top-[6px] text-gray-400 w-4 z-50"  /></button>
               
                </form>
                </div>
                <div className="relative text-primary-foreground">
                
                <Select onValueChange={(value) => setGenreFetch(value)} >
                    <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder="Genre"  />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Genre</SelectLabel>
                            <SelectItem value="Action" >Action</SelectItem>
                            <SelectItem value="Adventure" >Adventure</SelectItem>
                            <SelectItem value="Animation" >Animation</SelectItem>
                            <SelectItem value="Comedy" >Comedy</SelectItem>
                            <SelectItem value="Crime" >Crime</SelectItem>
                            <SelectItem value="Documentary" >Documentary</SelectItem>
                            <SelectItem value="Drama" >Drama</SelectItem>
                            <SelectItem value="Family" >Family</SelectItem>
                            <SelectItem value="Fantasy" >Fantasy</SelectItem>
                            <SelectItem value="History" >History</SelectItem>
                            <SelectItem value="Horror" >Horror</SelectItem>
                            <SelectItem value="Music" >Music</SelectItem>
                            <SelectItem value="Mystery" >Mystery</SelectItem>
                            <SelectItem value="Romance" >Romance</SelectItem>
                            <SelectItem value="Sci fi" >Sci fi</SelectItem>
                            <SelectItem value="Thriller" >Thriller</SelectItem>
                            <SelectItem value="War" >War</SelectItem>
                            <SelectItem value="Western" >Western</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                
                </div>
                <div className="relative text-primary-foreground">
                <Select onValueChange={(value) => setSortFetch(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort</SelectLabel>
                            <SelectItem value="Popularity" >Popularity</SelectItem>
                            <SelectItem value="Rating" >Rating</SelectItem>
                            <SelectItem value="Rating count" >Rating count</SelectItem>
                            <SelectItem value="Title desc" >Title desc</SelectItem>
                            <SelectItem value="Title asc" >Title asc</SelectItem>
                            <SelectItem value="Revenue" >Revenue</SelectItem>
                            <SelectItem value="Date desc" >Date desc</SelectItem>
                            <SelectItem value="Date asc" >Date asc</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
            </div>
            </div>
            <div className="grid grid-cols-6 gap-x-8  gap-y-20 py-10">
                {info &&
                info.map((item: any, index) => (
                    <div key={index} className="flex flex-col relative ">
                        <div className="absolute -top-3 left-[75px] w-12 h-8 rounded-full bg-orange-600 flex justify-center items-center"
                        style={{backgroundColor: handleBgColor(item.vote_average)}}
                        >
                            <p>{item.vote_average.toFixed(1)}</p>
                        </div>
                        <Link to={`/:${item.id}`} state={item}><img  src={`https://image.tmdb.org/t/p/original${item.poster_path}`} loading="lazy" alt="poster" className="w-[185px] h-[265px] rounded-sm shad" /></Link>
                        <div>
                            <Link to={`/:${item.id}`} state={item} ><p className="b text-lg text-sec">{item.title}</p></Link>
                           
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}
export default PopMovies