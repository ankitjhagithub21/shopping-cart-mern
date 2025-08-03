import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'

const Cart = () => {
  const user = useSelector((state) => state.auth.user)
  const items = useSelector((state) => state.cart.cart)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(false)

  const orderNow = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ items })
      })

      const data = await res.json()
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error('Order failed: ' + data.message);
      }
    } catch (error) {
      toast.error('Order failed: ' + error.message);
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center '>
        <div className='p-8 rounded-2xl shadow-xl text-center max-w-md mx-4'>
          <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>Authentication Required</h3>
          <p className='text-gray-600'>Please log in to view your cart.</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='min-h-screen  flex items-center justify-center'>
        <div className='text-center p-8'>
          <div className='relative inline-block'>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp"
              alt="empty cart"
              loading='lazy'
              className='w-80 h-80 object-contain '
            />
            <div className='absolute inset-0 bg-gradient-to-t  to-transparent rounded-lg'></div>
          </div>
          <h3 className='text-2xl font-bold mt-6 mb-2'>Your Cart is Empty</h3>
          <p className='mb-10'>Looks like you haven't added anything to your cart yet.</p>
          <Link to={"/"} className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'>
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pt-20'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}

        <h1 className='text-2xl font-bold mb-8 text-center'>Your Cart ({items.length} )</h1>



        <div className="flex flex-wrap gap-8 max-w-7xl mx-auto">
          {/* Cart Items */}
          <div className='flex-1 min-w-0'>
            <div className=' rounded-2xl  overflow-hidden'>
             
              <div className='space-y-4'>
                {items.map((item) => (
                  <div key={item.id}>
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className='w-full lg:w-96'>
            <div className=' rounded-2xl border  overflow-hidden sticky top-8'>
              <div className=' p-6'>
                <h2 className='text-2xl font-bold flex items-center'>
                
                  Order Summary
                </h2>
              </div>

              <div className='p-6 space-y-6'>
                {/* Order Details */}
                <div className='space-y-4'>
                  <div className='flex justify-between items-center p-4 bg-gray-50 rounded-xl'>
                    <span className='text-gray-600 font-medium'>Total Items</span>
                    <span className='text-xl font-bold text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm'>
                      {items.length}
                    </span>
                  </div>

                  <div className='flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200'>
                    <span className='text-gray-700 font-semibold'>Total Price</span>
                    <span className='text-2xl font-bold text-green-600'>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg hover:shadow-xl ${loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white'
                    }`}
                  onClick={orderNow}
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex items-center justify-center'>
                      <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <div className='flex items-center justify-center'>
                      <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' />
                      </svg>
                      Secure Checkout
                    </div>
                  )}
                </button>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart