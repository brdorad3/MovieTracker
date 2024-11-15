import './App.css'
import Navbar from './navbar'
import Hero from './hero'
import Trending from './trending'
import Body from "./lists"

function App() {
 

  return (
    <>
    <div className='w-full h-full'>
    <Navbar/>
    <Hero/>
    <Body/>
    </div>
  
    </>
  )
}

export default App
