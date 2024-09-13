import React from 'react'

export const CarCardSkeliton = () => {
  return (
    <div>
         <div className="border border-gray-200 rounded-lg shadow-md p-4 mx-4 mt-24 md:mt-10 sm:mt-5 animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-md"></div>
      <div className="text-center mt-2">
        <div className="h-8 bg-gray-300 rounded mt-4 w-3/4 mx-auto"></div>
        <div className="text-xl font-semibold mt-4 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
         
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="btn bg-gray-300 rounded w-20 h-10"></div>
        <div className="btn bg-gray-300 rounded w-20 h-10"></div>
      </div>
    </div>
    </div>
  )
}
