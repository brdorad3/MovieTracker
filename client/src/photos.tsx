import axios from "axios"
import { useEffect, useState } from "react"

const Photos = (props:any) => {

    const info = props.state
    const [photo, setPhoto] = useState<any[]>([])

    const fetchImages = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/images`, {info})
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
        <div className="grid grid-cols-2 gap-5">
        {
           
            photo &&
            
            photo.map((item) => (
                <img src={`https://image.tmdb.org/t/p/original${item.file_path}`} alt="" className="rounded-lg" key={item.id}/>
            ))
            
        }
        </div>
        </>
    )
}
export default Photos