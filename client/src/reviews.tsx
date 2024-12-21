import axios from "axios"
import { useEffect, useState } from "react"

const Reviews = (props:any) => {

    const info = props.state
    const [photo, setPhoto] = useState<any[]>([])

    const fetchImages = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/reviews`, {info})
            console.log(response.data)
            setPhoto(response.data.backdrops)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        fetchImages()
    },[props.info])

    return(
        <>
       
        </>
    )
}
export default Reviews