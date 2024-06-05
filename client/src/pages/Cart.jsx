import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import toast from "react-hot-toast"

const Cart = () => {
  const user = useSelector((state) => state.auth.user)
  const items = useSelector((state) => state.cart.cart)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const [loading,setLoading] = useState(false)

  const orderNow = async() =>{
    try{
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/checkout`,{
        method:"POST",
        
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify({items})
      })
  
      const data = await res.json()
      if (data.success) {
        window.location.href = data.url; 
      } else {
        toast.error('Order failed: ' + data.message);
      }
    }catch(error){
      toast.error('Order failed: ' + error.message);
    }finally{
      setLoading(false)
    }
  }

  if (!user) {
    return <p className='text-center text-lg my-5'>You are not logged in.</p>
  }

  if (items.length === 0) {
    return <div className='flex flex-col items-center justify-center p-5'>

      <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp" alt="cart" loading='lazy' />
      <p className='text-lg'>Your cart is empty.</p>

    </div>
  }

  return (
    <section className='h-screen w-full'>
      <h2 className='text-center text-2xl my-10 font-semibold'>Your Cart</h2>
      <div className="container   flex flex-wrap px-2 mx-auto">
        
        <div className='md:w-1/2 w-full'>
          {
            items.map((item) => {
              return <CartItem key={item.id} item={item} />
            })
          }
        </div>
        <div className=" md:w-1/2  w-full">
          <div className="border-2 m-2 border-gray-200 px-4 py-6 rounded-lg">
            <h2 className="title-font font-medium text-2xl mb-4">Cart Summary</h2>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg">Total Items:</span>
              <span className="text-lg">{items.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Total Price:</span>
              <span className="text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="mt-6 py-2 px-4 text-white bg-green-500 rounded hover:bg-green-600" onClick={orderNow}>
            {loading ? 'Loading...':'Checkout'}
            </button>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Cart
