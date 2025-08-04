import React, { useEffect, useState } from 'react'
import Products from './Products'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../components/Loader'
import { addToCart } from '../app/slices/cartSlice'
const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const res = await fetch(`https://dummyjson.com/products/${id}`)
            const data = await res.json()
            setProduct(data)
            setSelectedImage(data.thumbnail)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [id])

    const handleAddToCart = async () => {
        if (!user) {
            return toast.error("You are not logged in.")
        }

        const payload = {
            id: product.id, 
            title: product.title, 
            description: product.description, 
            image: product.thumbnail, 
            price: product.price, 
            category: product.category
        }
        
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            })
            const data = await res.json()

            if (data.success) {
                toast.success(data.message)
                dispatch(addToCart({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.thumbnail,
                    price: product.price,

                }))
                navigate("/cart")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        }

        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        }

        return stars
    }


    if (loading) {
        return <Loader />
    }
    if (!product) {
        return <p>Product not found.</p>
    }

    return (
        <section className="min-h-screen">
            <div className="container py-24 mx-auto">
                <div className="max-w-7xl mx-auto">

                    {/* Breadcrumb */}
                    <nav className="flex p-4 text-sm">
                        <Link to="/" className="transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <a href="#" className=" transition-colors capitalize">{product.category}</a>
                        <span className="mx-2">/</span>
                        <span className=" font-medium">{product.title.slice(0,20)}</span>
                    </nav>

                    <div className="rounded-3xl overflow-hidden">
                        <div className="flex flex-wrap">

                            {/* Product Image Section */}
                            <div className="lg:w-1/2 w-full p-8">
                                <div className="relative">
                                    {/* Main Image */}
                                    <div className="relative rounded-2xl overflow-hidden mb-6 group">
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                                        )}
                                        <img
                                            alt={product.title}
                                            className={`w-full h-96 object-contain object-center transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            src={selectedImage}
                                            onLoad={() => setImageLoaded(true)}
                                        />

                                      
                                    </div>

                                    {/* Thumbnail Images */}
                                    <div className="flex space-x-4 justify-center">
                                        {product.images.map((url, index) => (
                                            <div
                                                key={index}
                                                className={`w-20 h-20 border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${selectedImage === index ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                                                    }`}
                                                onClick={() => setSelectedImage(url)}
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Product ${index}`}
                                                    className="w-full h-full object-contain "
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details Section */}
                            <div className="lg:w-1/2 w-full lg:p-8 p-4 lg:pl-16">
                                <div className="space-y-6">

                                    {/* Category */}
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide border border-blue-200">
                                            {product.category}
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-lg text-green-600 font-medium">In Stock</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h1 className="lg:text-4xl text-2xl font-bold leading-tight">
                                        {product.title}
                                    </h1>

                                    {/* Rating */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            {renderStars(product.reviews.length)}
                                        </div>
                                        <span>
                                            ({product.reviews.length} reviews)
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center flex-wrap  gap-4">
                                        <span className="text-4xl font-bold text-green-600">
                                            ${product.price}
                                        </span>
                                        <span className="text-lg text-gray-500 line-through">
                                            ${(product.price * 1.2).toFixed(2)}
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Save 20%
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="rounded-2xl">
                                        <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                                        <p className=" leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Quantity and Add to Cart */}
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <span className="font-medium">Quantity:</span>
                                            <div className="flex items-center border rounded-lg">
                                                <button
                                                    className="px-4 py-2 transition-colors"
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-2 font-medium">{quantity}</span>
                                                <button
                                                    className="px-4 py-2  transition-colors"
                                                    onClick={() => setQuantity(quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex space-x-4">
                                            <button
                                                className={`flex-1 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg hover:shadow-xl ${isLoading
                                                    ? 'bg-gray-400 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
                                                    }`}
                                                onClick={handleAddToCart}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Adding...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M6 13h12" />
                                                        </svg>
                                                        ADD TO CART
                                                    </div>
                                                )}
                                            </button>

                                            <button className="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-red-500 hover:text-red-500 transition-all duration-200 transform hover:scale-105">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <span className="text-sm text-blue-800 font-medium">Free Shipping</span>
                                        </div>
                                        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-green-800 font-medium">30-Day Return</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails
