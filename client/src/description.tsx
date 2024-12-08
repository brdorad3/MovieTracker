

const Description = (props: any) => {
        const info = props.state
    return(
        <>
        {info &&
        <div>
            <h1 className="b font-bold text-sm py-3">{info.tagline.toUpperCase()}</h1>
            <p>{info.overview}</p>
            <div>
               <div className="flex gap-2">
                    <h2 className="font-bold">Languages </h2>
                    {info.languages ? info.languages.map((item: any) => (
                        <p>{item}</p>
                    )):
                    info.spoken_languages.map((item: any) => (
                        <p>{item.name}</p>
                    ))
                    
                    }
               </div>
            </div>
        </div>
        }
        </>
    )
}
export default Description