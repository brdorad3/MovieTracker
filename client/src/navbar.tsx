import { Search, SunMoon, List, MoveUpIcon } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import "./App.css"


 const Navbar  = () => {
    const [search, setSearch] = useState(false)
    const [movie, setMovie] = useState(false)
    const [tv, setTv] = useState(false)
    const [info, setinfo] = useState("")
    const navigate = useNavigate()
    const [type, setType] = useState("movie")

    const handleClick = () => {
        setSearch(!search)
    }
    const handleInput = (e: any) => {
        setinfo(e.target.value)
    }
    const handleSubmit = (info: any) => {
        navigate(`/search?q=${encodeURIComponent(info)}&tp=${encodeURIComponent(type)}`);
        setSearch(false) 
        setinfo("")
    }

    const handleLink = () => {
        setSearch(false) 
        setinfo("")
    }

    return(
        <>
        <nav className="h-[4.8rem] w-full bg-first relative">
            <div className="max-w-7xl container mx-auto flex h-full justify-between items-center px-4 sm:px-6 md:px-8 w-full">
            <div className="flex items-center sm:gap-32 gap-5">
            <Link to="/"><h1 className="sm:text-3xl text-acc font-bold pop">Robnite</h1></Link>
            <div className="col-start-3 flex sm:gap-16 gap-5">
            <div className="col-start-3 relative">
            <p className=" text-sec cursor-pointer max-sm:text-sm " onMouseOver={() => setMovie(true)} onMouseOut={() => setMovie(false)} >MOVIES</p>
            {movie &&
                <ul className="absolute bg-white z-10 rounded-md shad py-1" onMouseOver={() => setMovie(true)} onMouseOut={() => setMovie(false)} >
                    <Link to="/popmovies"><li className="hover:bg-blue-300 w-full px-4 py-[6px]">Popular</li></Link>
                    <li className="hover:bg-blue-300 w-full px-4 py-[6px]">Upcoming</li>
                   <Link to="/topmovies"><li className="hover:bg-blue-300 w-full px-4 py-[6px]">Top Rated</li></Link>
                </ul>
            }
            </div>
            <div className="col-start-3 relative">
            <p className="text-sec whitespace-nowrap cursor-pointer max-sm:text-sm" onMouseOver={() => setTv(true)} onMouseOut={() => setTv(false)}>TV SHOWS</p>
            {tv &&
                <ul className="absolute bg-white z-10 rounded-md shad py-1" onMouseOver={() => setTv(true)} onMouseOut={() => setTv(false)} >
                    <Link to="/poptv"><li className="hover:bg-blue-300 w-full px-4 py-[6px]">Popular</li></Link>
                    <li className="hover:bg-blue-300 w-full px-4 py-[6px]">Upcoming</li>
                    <li className="hover:bg-blue-300 w-full px-4 py-[6px]">Top Rated</li>
                </ul>
            }
            </div>
            <SignInButton><p className="text-sec cursor-pointer max-md:hidden">LOGIN</p></SignInButton>
            </div>
            </div>
            {search &&
            <form className="absolute -bottom-10 z-50 w-full h-10 left-0" onSubmit={() => handleSubmit(info)}>
                <input type="text" className="w-full h-full sm:px-24 pl-10 pr-3 border-y border-gray-200" placeholder="Search..." onChange={(e) => handleInput(e)} value={info}/>
                <Search className="absolute top-2 sm:left-14 left-2 text-black sm:w-[24px] w-[20px]" ></Search>
                {
                    info && info.length > 2 &&
                    <div className=" w-full bg-white flex flex-col">
                    <Link  to={`/search?q=${encodeURIComponent(info)}&tp=movies`} 
                    onClick={handleLink}
                    
                    className=" border-gray-200 sm:px-24 px-3 pop ">Search "{info}" in movies</Link>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                    <Link  to={`/search?q=${encodeURIComponent(info)}&tp=tv`} 
                    onClick={handleLink}
                    className="border-gray-200 sm:px-24 px-3 pop">Search "{info}" in tv shows</Link>
                    <div className="h-[1px] w-full bg-gray-200"></div>
                </div>
                }
                
            </form>
            }
            <div className="flex items-center sm:gap-16 gap-5">
            <Search className="col-start-10 justify-self-center text-sec cursor-pointer sm:w-[30px] w-[22px]"  onClick={handleClick} />
            <Link to={"/mylist"}><List className="text-sec sm:w-[30px] w-[23px]" ></List></Link>
            <SignedIn><UserButton/></SignedIn>
            <SignedOut><div className="rounded-full bg-white sm:w-[30px] w-[23px] sm:h-[30px] h-[23px]"></div></SignedOut>
            </div>
            </div>
        </nav>
        
        </>
    )
 } 
 export default Navbar