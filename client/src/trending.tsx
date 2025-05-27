import "dotenv"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const Trending = () => {

  const [info, setInfo] = useState<any[]>([])
  

    const fetchPopular = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API}/trending`);
         
          setInfo(response.data)
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      };
    useEffect(()=>{
        fetchPopular();
    },[])

    
    return(
        <>
        <h1 className="text-lg py-8 cool font-bold tracking-widest text-vour pl-2 sm:pl-0 ">TRENDING</h1>
        <div className="block md:hidden">
  <Carousel
    opts={{ align: "start", loop: true }}
    className="w-full "
  >
    <CarouselContent>
      {info &&
        info.slice(0, 6).map((item: any) => (
          <CarouselItem key={item.id} className="basis-1/2">
            <div className="p-1">
              <Link to={`/${item.id}`} state={item}>
               
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      alt=""
                      className="w-full h-full  rounded-md"
                      loading="lazy"
                    />
                 
              </Link>
            </div>
          </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious className="left-2" />
    <CarouselNext className="right-2" />
  </Carousel>
</div>
        <ul className="w-full hidden md:flex justify-between">
          {info &&
    info.slice(0, 6).map((item: any) => (
      <Link to={`/${item.id}`} key={item.id}  state={item}>
      <li
        key={item.id}
        className="w-[185px] h-[265px]  box-border rounded-md hover:cursor-pointer shad3 hover:scale-105">
        <img
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          alt=""
          className="w-full h-full rounded-md"
          loading="lazy"
        />
      </li>
      </Link>
    ))}
</ul>

        </>
    )
}
export default Trending