import { useState, useEffect } from "react"
import axios from "axios"


const Cast = (props: any) => {

    const info = props.state
    const [review, setReview] = useState<any[]>([])

    const fetchImages = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/cast`, {info})
            console.log(response.data)
            setReview(response.data.cast)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        fetchImages()
    },[props.info])

    return(
        <>
        <div className="grid grid-cols-2 gap-y-10 ">
            {review &&
            review.map((item:any) => (
                <div className="flex gap-5 items-center" key={item.id}>
                    <img src={`https://image.tmdb.org/t/p/w66_and_h66_face${item.profile_path}`} alt="" className="w-16 h-16 rounded-lg"/>
                    <div className="flex flex-col gap-2">
                        <h2 className="lemon text-sm">{item.name}</h2>
                        <h3 className="text-sm geosans">{item.character}</h3>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
export default Cast