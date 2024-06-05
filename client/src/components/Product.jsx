import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = ({product}) => {
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate(`/products/${product.id}`)
       window.scrollTo(0,0)
    }
  return (
    <div className="p-4 lg:w-1/4 md:w-1/2 w-full" onClick={handleClick}>
    <div className="h-full flex flex-col items-center cursor-pointer rounded-lg p-2 bg-gray-100 hover:bg-gray-200 text-black text-center ">
      <img
        alt="team"
        className="flex-shrink-0 rounded-lg w-full h-56 object-contain object-center mb-4"
        src={product.image}
      />
      <div className="w-full">
        <h2 className="font-medium text-lg">
         $ {product.price}
        </h2>
        <h3 className="mb-3">{product.category}</h3>
        <p className="mb-4">
          {product.title}
        </p>
       
      </div>
    </div>
  </div>
  )
}

export default Product
