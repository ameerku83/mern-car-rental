import React from 'react'

export const CardetailSkeleton = () => {
  return (
    <div>
          <div className="p-4 max-w-4xl mx-auto bg-base-200 border border-purple-200 shadow-md rounded-lg ">
        <div className="md:flex items-center space-x-4 animate-pulse">
            <div className="w-72 h-72 bg-gray-300 rounded-md"></div>
            <div className="flex-1 space-y-4">
            <div className="h-12 bg-gray-300 rounded w-3/4"></div>
               
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div>
    </div>
    </div>
  )
}
