import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

const MyList = () => {

    const user = useUser();
    const [userData, setUserData] = useState<any[]>([])
    
    const fetch_review = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/fetch_user_review`, user)
            setUserData(response.data.revs)
        
        }catch(e){
            console.error(e)
        }
    }

    useEffect(()=>{
        
        fetch_review()
    }, [])

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

    return (
        <>
        <Navbar/>
        <div className="px-[310px]">
        <h1 className="text-white">Your ratings.</h1>
            {
                userData ?
                <ul className="grid grid-cols-6 gap-x-8  gap-y-20 py-10">
                {userData.map((review, index) => (
                    <li key={index} className="flex flex-col relative ">
                                            <div className="absolute -top-3 left-[75px] w-12 h-8 rounded-full bg-orange-600 flex justify-center items-center"
                                            style={{backgroundColor: handleBgColor(review.rating)}}
                                            >
                                                <p>{review.rating}</p>
                                            </div>
                                            <Link to={`/:${review.movieId}`} state={review}><img  src={`https://image.tmdb.org/t/p/original${review.poster_url}`} loading="lazy" alt="poster" className="w-[185px] h-[265px] rounded-sm shad" /></Link>
                                            <div>
                                                <Link to={`/:${review.movieId}`} state={review} ><p className="b text-lg text-sec">{review.name}</p></Link>
                                               
                                            </div>
                                            
                                        </li>
                ))}
                </ul>
                :
                <div>No lists</div>
            }
            </div>
        </>
    )
}

export default MyList