import React from 'react'
const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 my-32 px-4">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog!!</h1>
      <p className="md:text-lg text-sm text-gray-500/80 max-w-xl">
        Subscribe to our newsletter to get the latest blogs, updates and exclusive news.
      </p>
      
    <form className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xl px-4 mx-auto">
    <input
        type="email"
        placeholder="Enter your email..."
        required
        className="w-full sm:flex-1 border border-gray-300 rounded-md sm:rounded-r-none h-12 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
    />
    <button
        type="submit"
        className="h-12 w-full sm:w-auto px-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-md sm:rounded-l-none hover:brightness-110 transition-all shadow hover:shadow-lg text-sm"
    >
        Subscribe
    </button>
    </form>


    </div>
  );
};


export default NewsLetter