import React from 'react';

const UserErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200 px-4">
      
      <div className="animate-bounce text-red-500 text-4xl mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-20 h-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6.001c0-1.054-.816-1.918-1.85-1.995L18.92 4H5.08c-1.054 0-1.918.816-1.995 1.85L3.08 6v10.999c0 1.054.816 1.918 1.85 1.995L5.08 19z"
          />
        </svg>
      </div>

      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-error animate-fade-in">
          Oops! Page Not Found
        </h1>
        <p className="mt-4 text-lg">
        The page you are looking for might have been moved or doesn't exist anymore.
        </p>
        
        <div className="mt-6">
          <a href={ "/"} className="btn btn-primary animate-pulse"> Go Home   </a>
        </div>
      </div>
    </div>
  );
};

export default UserErrorPage;
