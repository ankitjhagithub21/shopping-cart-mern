import React from 'react'
import img from "/cart.png"
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <section>
            <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col-reverse items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  md:mb-0 items-center text-center">
                    <h1 className=" sm:text-4xl text-3xl mb-4 font-bold">
                        Welcome To Shopping Cart </h1>
                    <p className="mb-8 leading-relaxed">
                        At our online store, we offer a wide range of high-quality products to meet your shopping needs. Whether you're looking for fashion, electronics, home appliances, or any other item, we have it all covered.
                    </p>
                    <div className="flex justify-center">
                        <Link className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" to={"/cart"}>
                            Cart
                        </Link>
                        <Link className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" to={"/products"}>
                            Products
                        </Link>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/3 w-full" id='hero-img'>
                    <img
                        className="object-cover object-center rounded p-5"
                        alt="hero"
                        src={img}
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero