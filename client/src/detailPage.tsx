import { useLocation } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

interface info{
    backdrop_path: string,
    genres: [],
   

}

const Details = (props: any) => {
    const location = useLocation()
    const info = location.state
    const [detailedInfo, setDetailedInfo] = useState<any>()

    const handleClick = async(item: any) => {
        try{
          console.log(item)
          const response = await axios.post(`${import.meta.env.VITE_API}/details`, {item});
          setDetailedInfo(response.data)
        }catch (error){
          console.error("Error fetching data", error)
        }
      }
      useEffect(() => {
        handleClick(info)
      },[])

    
console.log(detailedInfo)

    return (
        <>
        {
            detailedInfo &&
<div className="w-screen h-full relative bg-cover grid grid-cols-custom grid-rows-12 justify-center"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${detailedInfo.backdrop_path})`}}
        >
            
         <div className="flex justify-center gap-20 row-start-2 text-white col-start-6">
            <h2 className="">MOVIES</h2>
            <h2 className="whitespace-nowrap">TV SHOWS</h2>
            <h2>NEWS</h2>
         </div>
         <div className="row-start-6">
            <h1 className="text-white lemon text-[100px] tracking-wider">{info.original_name}</h1>
            {detailedInfo.genres &&
            detailedInfo.genres.map((item: any)=>(
                <p>{item.name}</p>
            ))
            }
         </div>
    
        </div>
        
        }
        </>
    )
}

export default Details