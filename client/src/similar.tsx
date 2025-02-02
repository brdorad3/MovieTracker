import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Similar = (props:any) => {
    
    const info = props.state
    const [similar, setSimilar] = useState<any[]>([])
    

    const fetchSimilar = async() => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API}/similar`, {info})
            console.log(response.data)
            setSimilar(response.data.results)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(() => {
        fetchSimilar()
    },[info])

   

    return(
        <>
        <div className="grid grid-cols-5 gap-2">
        {similar &&
        similar.map((item: any) => (
            <Link to={`/${item.id}`} state={item} ><img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" className="rounded-md hover:scale-95" key={item.id}/></Link>
        ))
        }
        </div>
        </>
    )
}
export default Similar