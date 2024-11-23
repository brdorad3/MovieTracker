import { useLocation } from "react-router-dom"

const Details = (props: any) => {
    const location = useLocation()
    const info = location.state

console.log(location)
    return (
        <>
        <div className="w-screen h-full relative bg-cover"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${info.backdrop_path})`}}
        >
            
         <div className="flex justify-center gap-20 py-10 text-white">
            <h2>MOVIES</h2>
            <h2>TV SHOWS</h2>
            <h2>NEWS</h2>
         </div>
    
        </div>
        </>
    )
}

export default Details