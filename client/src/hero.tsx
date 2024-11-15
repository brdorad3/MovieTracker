

const Hero = () => {

    return(
        <>
        <div className="w-full h-[92%] n grid grid-cols-custom gap-x-[20px] justify-center grid-rows-12 relative">
            <span className="s col-start-1 row-start-4 text-8xl whitespace-nowrap text-black">The Batman</span>
            <span className="fade-effect1 row-start-6"></span>
            <q className="row-start-7 whitespace-nowrap b text-xl">They think I am hiding in the shadows, but I am the shadows.</q>
            <p className="row-start-8 text-[9px] whitespace-nowrap">1 MARCH 2022</p>
            <div className="row-start-9 flex flex-col">
            <p className="text-vour b">Genre:</p>
            <p className="whitespace-nowrap text-sm b">Crime  |  Thriller  |  Mistery</p>
            </div>
            <div className="row-start-10 flex flex-col">
            <p className="text-vour b">Directed by:</p>
            <p className="whitespace-nowrap text-sm b">Matt Reeves</p>
            </div>
            <div className="row-start-11 flex">
            <p className="text-vour whitespace-nowrap b">IMDB rating: 7.8</p>
            
            </div>
            <div className="row-start-11 col-start-3 flex flex-col items-center">
            <p className="whitespace-nowrap text-sm flex gap-1 b">120 min | <p className="text-vour"> R</p></p>
            </div>
            <button className="row-start-11 absolute left-0 margin self-center px-7 py-2  border-2 border-vour rounded-full text-vour b">MORE</button>
            <div className="row-start-7 col-start-9 col-span-4 pr-10">
                <p className="leading-5 text-[18px] b text-end z-10 relative">Two years of nights have turned Bruce Wayne into a nocturnal animal. But as he continues to find his way as Gotham's dark knight Bruce is forced into a game of cat and mouse with his biggest threat so far, a manic killer known as "The Riddler" who is filled with rage and determined to expose the corrupt system whilst picking off all of Gotham's key political figures. Working with both established and new allies, Bruce must track down the killer and see him brought to justice, while investigating his father's true legacy and questioning the effect that he has had on Gotham so far as "The Batman."</p>
            </div>
            <p className="-rotate-90 col-start-11 leading-[55px] a text-[110px] row-start-10 text-vour "><p className="opacity-40">robert</p> <br /><p className="text-black opacity-70">Pattinson</p></p>
        </div>
        </>
    )
}

export default Hero