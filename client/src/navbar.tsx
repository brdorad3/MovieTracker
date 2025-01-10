import { Search, SunMoon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { UserButton, UserProfile, SignedIn, SignedOut } from "@clerk/clerk-react"


 const Navbar  = () => {
    const [search, setSearch] = useState(false)
    const [movie, setMovie] = useState(false)
    const [tv, setTv] = useState(false)
    const [info, setinfo] = useState("")

    const handleClick = () => {
        setSearch(!search)
    }
    const handleInput = (e: any) => {
        setinfo(e.target.value)
    }

    return(
        <>
        <nav className="h-[8%] w-full bg-first  grid grid-cols-custom justify-center gap-x-[20px] items-center relative">
            <Link to="/"><h1 className="text-3xl text-acc ">Robnite</h1></Link>
            <div className="col-start-3 flex gap-12">
            <div className="col-start-3 relative">
            <p className=" text-sec cursor-pointer" onMouseOver={() => setMovie(true)} onMouseOut={() => setMovie(false)} >MOVIES</p>
            {movie &&
                <ul className="absolute bg-white z-10 rounded-md shad py-1" onMouseOver={() => setMovie(true)} onMouseOut={() => setMovie(false)} >
                    <Link to="/popmovies"><li className="hover:bg-blue-300 w-full px-4 py-[6px]">Popular</li></Link>
                    <li className="hover:bg-blue-300 w-full px-4 py-[6px]">Upcoming</li>
                   <Link to="/topmovies"><li className="hover:bg-blue-300 w-full px-4 py-[6px]">Top Rated</li></Link>
                </ul>
            }
            </div>
            <div className="col-start-3 relative">
            <p className="text-sec whitespace-nowrap cursor-pointer" onMouseOver={() => setTv(true)} onMouseOut={() => setTv(false)}>TV SHOWS</p>
            {tv &&
                <ul className="absolute bg-white z-10 rounded-md shad py-1" onMouseOver={() => setTv(true)} onMouseOut={() => setTv(false)} >
                    <Link to="/poptv"><li className="hover:bg-blue-300 w-full px-4 py-[6px]">Popular</li></Link>
                    <li className="hover:bg-blue-300 w-full px-4 py-[6px]">Upcoming</li>
                    <li className="hover:bg-blue-300 w-full px-4 py-[6px]">Top Rated</li>
                </ul>
            }
            </div>
            <Link to="/login"><p className="text-sec">NEWS</p></Link>
            </div>
            {search &&
            <div className="absolute -bottom-10 z-50 w-full h-10">
                <input type="text" className="w-full h-full px-24 border-y border-gray-200" placeholder="Search..." onChange={(e) => handleInput(e)} value={info}/>
                <Search className="absolute top-2 left-14 text-black" size={25}></Search>
                {
                    info && info.length > 2 &&
                    <div className=" w-full bg-white flex flex-col">
                    <Link to="/search" className=" border-gray-200 px-24" state={{info: info, media_type: "movie"}}>Search <strong>{info}</strong> in movies</Link>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                    <Link to="/search" className="border-gray-200 px-24" state={{info: info, media_type: "tv"}}>Search <strong>{info}</strong> in tv shows</Link>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                </div>
                }
                
            </div>
            }
            
            <Search className="col-start-10 justify-self-center text-sec" size={30} onClick={handleClick} />
            <SunMoon className="col-start-11 text-sec justify-self-center" size={30} />
            <SignedIn><UserButton/></SignedIn>
            <SignedOut><div className="w-9 h-9 rounded-full bg-white"></div></SignedOut>
            
        </nav>
        
        </>
    )
 } 
 export default Navbar