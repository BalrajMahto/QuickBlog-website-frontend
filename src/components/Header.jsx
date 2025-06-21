import React from 'react'
import { assets } from '../assets/assets'
import RotatingText from '../../reactbits/RotatingText/RotatingText'
import { useAppContext } from '../context/appContext'
import { useRef } from 'react'

const Header = () => {

  const {setInput,input} = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  }

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'> 
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                <p>New: AI feature integrated</p>
                <img src={assets.star_icon} alt="" className='w-2.5' />
            </div>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight'>
  Your Own
  <br className="block sm:hidden" />
  <span className='inline-block align-middle min-w-[160px] sm:min-w-[220px] md:min-w-[260px] ml-0 sm:ml-3'>
    <RotatingText
      texts={['Blogging', 'Posts','Storytelling','Writing', 'Sharing', 'Publishing','Expression','Journal']}
      mainClassName="w-full px-2 sm:px-2 md:px-3 bg-primary/10 text-primary overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-3xl sm:text-4xl md:text-5xl font-bold text-center"
      staggerFrom={"last"}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  </span>
  <br />
  Platform.
</h1>
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

          <form onSubmit={onSubmitHandler} className="w-full max-w-3xl mx-auto px-4">
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
    
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for blogs"
              required
              className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-sm sm:text-base"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-6 py-2 m-1 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              Search
            </button>
            </div>
          </form>
          <div className='text-center'>
           {
            input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear search</button>
           }
            </div>


        </div>
        <img src={assets.gradientBackground} alt="" className="absolute -top-[50px] z-[-1] opacity-50"/>
    </div>
  )
}

export default Header