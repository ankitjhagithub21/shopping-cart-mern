import React, { useState } from 'react'
import {useNavigate} from "react-router-dom" 
const Product = ({product}) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const handleClick = () => {
    navigate(`/products/${product.id}`)
    window.scrollTo(0,0)
   
  }

  return (
    <div className="p-4 lg:w-1/4 md:w-1/2 w-full" onClick={handleClick}>
      <div 
        className="h-full flex flex-col items-center cursor-pointer rounded-2xl p-4 bg-white shadow-lg hover:shadow-2xl text-black text-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Overlay */}
        <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-50 mb-4">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"></div>
          )}
          
          <img
            alt={product.title}
            className={`w-full h-full object-contain object-center transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={product.thumbnail}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`bg-white/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300 ${
                isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Quick View Badge */}
          <div className={`absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            Quick View
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full space-y-3">
          {/* Category Badge */}
          <div className="flex justify-center">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide border border-blue-200">
              {product.category}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <div className={`w-2 h-2 bg-green-500 rounded-full transition-all duration-300 ${
              isHovered ? 'animate-pulse' : ''
            }`}></div>
          </div>
          
          {/* Action Button */}
          <div className={`transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              View Details
            </button>
          </div>
        </div>
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`} style={{padding: '1px', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)', zIndex: -1}}>
          <div className="w-full h-full bg-white rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}

export default Product