import { Search, SunMoon } from "lucide-react"

 const Navbar  = () => {

    return(
        <>
        <nav className="h-[8%] w-screen bg-first  grid grid-cols-custom justify-center gap-x-[20px] items-center">
            <h1 className="text-3xl text-acc ">Robnite</h1>
            <p className="col-start-3 text-sec ">MOVIES</p>
            <p className="col-start-4 text-sec">TV SHOWS</p>
            <p className="col-start-5 text-sec">NEWS</p>
            <Search className="col-start-10 justify-self-end text-sec" size={30} />
            <SunMoon className="col-start-11 text-sec justify-self-center" size={30} />
            <div className="w-[40px] h-[40px] rounded-full bg-sec col-start-12"></div>
        </nav>
        
        </>
    )
 } 
 export default Navbar