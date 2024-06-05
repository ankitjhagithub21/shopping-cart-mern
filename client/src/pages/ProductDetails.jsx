import React, { useEffect, useState } from 'react'
import Products from './Products'
import { useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast"
import {useDispatch, useSelector} from "react-redux"
import Loader from '../components/Loader'
import { addToCart } from '../app/slices/cartSlice'
const ProductDetails = () => {
    const {id} = useParams()
    const [product,setProduct] = useState(null)
    const [loading,setLoading] = useState(true)
    const user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchProduct = async() =>{
        try{
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_PRODUCTS_URL}/${id}`)
            const data = await res.json()
            setProduct(data)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchProduct()
    },[id])

    const handleAddToCart = async() =>{
        if(!user){
            return toast.error("You are not logged in.")
        }
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify(product)
            })
            const data = await res.json()
            if(data.success){
                toast.success(data.message)
                dispatch(addToCart({
                    id:product.id,
                    title:product.title,
                    description:product.description,
                    image:product.image,
                    price:product.price,
                    
                }))
                navigate("/cart")
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
    }

    if(loading){
        return <Loader/>
    }
    if(!product){
        return <p>Product not found.</p>
    }

    return (
        <>
            <section className="min-h-screen w-full flex items-center justify-center">
                <div className="container px-5 py-24 mx-auto">
                    <div className="w-full mx-auto flex flex-wrap gap-5 items-center justify-center">
                        <img
                            alt="ecommerce"
                            width={300}
                            src={product.image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm tracking-widest">
                                {product.category}
                            </h2>
                            <h1 className="text-3xl font-medium mb-1">
                                {product.title}
                            </h1>
                           
                            <p className="leading-relaxed mb-5">
                              {product.description}
                            </p>
                          
                            <div className="flex">
                                <span className="font-medium text-2xl ">
                                    $ {product.price}
                                </span>
                                <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded" onClick={handleAddToCart}>
                                        ADD TO CART
                                </button>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </section>

           
        </>
    )
}

export default ProductDetails
