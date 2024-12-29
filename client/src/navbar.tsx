import { Search, SunMoon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


 const Navbar  = () => {
    const [search, setSearch] = useState(false)
    const [info, setinfo] = useState("")

    const handleClick = () => {
        setSearch(!search)
    }
    const handleInput = (e: any) => {
        setinfo(e.target.value)
    }
    /*
    const fetchSearch = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/search`, {info})
            console.log(response.data)
        }catch(e){
            console.error(e)
        }
    }
   
        useEffect(() => {
            fetchSearch()
        },[info])*/
    
            
       

    return(
        <>
        <nav className="h-[8%] w-full bg-first  grid grid-cols-custom justify-center gap-x-[20px] items-center relative">
            <h1 className="text-3xl text-acc ">Robnite</h1>
            <p className="col-start-3 text-sec ">MOVIES</p>
            <p className="col-start-4 text-sec">TV SHOWS</p>
            <p className="col-start-5 text-sec">NEWS</p>
            {search &&
            <div className="absolute -bottom-10 z-50 w-full h-10">
                <input type="text" className="w-full h-full px-24 border-y border-gray-200" placeholder="Search..." onChange={(e) => handleInput(e)} value={info}/>
                <Search className="absolute top-2 left-14 text-black" size={25}></Search>
                {
                    info && info.length > 2 &&
                    <div className="h-20 w-full bg-white flex flex-col">
                    <Link to="/search" className=" border-gray-200 px-24" state={{info: info, type: "movie"}}>Search {info} in movies</Link>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                    <Link to="/search" className="border-gray-200 px-24" state={{info: info, type: "tv"}}>Search {info} in tv shows</Link>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                </div>
                }
                
            </div>
            }
            
            <Search className="col-start-10 justify-self-center text-sec" size={30} onClick={handleClick} />
            <SunMoon className="col-start-11 text-sec justify-self-center" size={30} />
            <div className="w-[40px] h-[40px] rounded-full bg-sec col-start-12 justify-self-center"></div>
        </nav>
        
        </>
    )
 } 
 export default Navbar