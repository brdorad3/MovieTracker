

const Description = (props: any) => {
        const info = props.state
    return(
        <>
        {info &&
        <div>
            <h1 className="b font-bold text-sm py-3">{info.tagline.toUpperCase()}</h1>
            <p>{info.overview}</p>
            <div>
            <div className="flex gap-2 border-b pb-3 pt-10">
                <p className="font-bold">Type </p>
                {info.runtime ?
                    <p>Movie</p>:
                    <p>TV</p>
                }
               </div>
               <div className="flex gap-2 pt-2 pb-3 border-b">
                    <h2 className="font-bold">Languages </h2>
                    {info.languages ? info.languages.map((item: any) => (
                        <p key={item.id}>{item}</p>
                    )):
                    info.spoken_languages.map((item: any) => (
                        <p key={item.id}>{item.name}</p>
                    ))
                    
                    }
               </div>
                    {info.runtime &&
                    
               <div className="flex gap-2 border-b pb-3 pt-2">
                <p className="font-bold">Runtime </p>
                    <p>{info.runtime} min</p>
               </div>
                    }
                    {info.number_of_episodes &&
                    
                    <div className="flex gap-2 border-b pb-3 pt-2">
                     <p className="font-bold">Number of episodes </p>
                         <p>{info.number_of_episodes}</p>
                    </div>
                    }
                    {info.number_of_seasons &&
                    
                    <div className="flex gap-2 border-b pb-3 pt-2">
                     <p className="font-bold">Number of seasons </p>
                         <p>{info.number_of_seasons}</p>
                    </div>
                    }
                    {info.in_production &&
                    
                    <div className="flex gap-2 border-b pb-3 pt-2">
                     <p className="font-bold">In production </p>
                         <p>{info.in_production.toString()}</p>
                    </div>
                         }
                         {info.budget &&
                    
                    <div className="flex gap-2 border-b pb-3 pt-2">
                     <p className="font-bold">Budget </p>
                         <p>${info.budget}</p>
                    </div>
                         }
                         {info.revenue &&
                    
                    <div className="flex gap-2 border-b pb-3 pt-2">
                     <p className="font-bold">Revenue </p>
                         <p>${info.revenue}</p>
                    </div>
                         }
                         {info.vote_average &&
                    
                    <div className="flex gap-2 border-b pb-3 pt-2">
                     <p className="font-bold">Rating </p>
                         <p>{info.vote_average.toFixed(1)}/10 &#40;{info.vote_count}&#41;</p>
                    </div>
                         }
              
            </div>
        </div>
        }
        </>
    )
}
export default Description