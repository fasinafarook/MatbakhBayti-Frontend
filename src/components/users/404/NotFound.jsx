import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://img.freepik.com/premium-photo/digital-illustration-exploding-fast-food-dark-background-with-sense-motion-generative-ai_431161-1089.jpg" 
          alt="Food delivery concept"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">Oops! Page Not Found</h2>
        <p className="text-lg text-white max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. 
          But don't worry, we've got plenty of delicious options for you!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white text-orange-600 font-medium rounded-full hover:bg-gray-100 transition"
          >
            Go Back
          </button>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-full hover:bg-orange-700 transition"
          >
            Return Home
          </button>
        </div>
        
        <div className="mt-12">
          <p className="text-white">Or try one of these popular options:</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button 
              onClick={() => navigate('/menu')}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition"
            >
              View Menu
            </button>
            {/* <button 
              onClick={() => navigate('/deals')}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition"
            >
              Special Deals
            </button> */}
            <button 
              onClick={() => navigate('/orders')}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;