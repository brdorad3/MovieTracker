import axios from "axios"
import { useEffect, useState } from "react"
import { DateTime } from "luxon"

const Reviews = (props:any) => {

    const info = props.state
    const [review, setReview] = useState<any[]>([])

    const fetchImages = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/reviews`, {info})
            console.log(response.data)
            setReview(response.data.results)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        fetchImages()
    },[props.info])

    return(
        <>
            <div className="flex flex-col gap-5">
                {review &&
                review.map((item: any) => (
                    <div className="p-4 shad rounded-md flex flex-col gap-5" key={item.id}>
                        <div className="flex items-center gap-3">
                        <div className="bg-black w-12 h-12 rounded-full"></div>
                        <div>
                        <p>{item.author}</p>
                        <div className="flex gap-2">
                        {item.author_details.rating &&
                            <p>{item.author_details.rating}/10</p>
                        }
                        <p>Created on {DateTime.fromISO(item.created_at).toLocaleString(DateTime.DATE_MED)}</p>
                        </div>
                        </div>
                        </div>
                        <p>{item.content}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Reviews