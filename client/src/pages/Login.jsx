import React, { useState } from 'react'
import toast from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom'
const Login = ({getUser}) => {
  const initialData = {
    
    email:"",
    password:""
  }
  const [formData,setFormData] = useState(initialData)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target;

    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try{
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(formData)
      })

      const data = await res.json()

      if(data.success){
        setFormData(initialData)
        toast.success(data.message)
        getUser()
        navigate("/")
      }else{
        toast.error(data.message)
      }

    }catch(error){

      toast.error("Something went wrong.")
      console.log(error)
    }finally{
      
      setLoading(false)
      
    }

  }
  return (
      <section className='h-screen w-full flex items-center justify-center'>
        <div className='flex flex-col gap-5 lg:w-1/3 w-full'>
          <h2 className='text-2xl text-center'>Login to your account</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          
            <input type="email" placeholder='Enter Your Email' name='email' className=' text-gray-800 px-4 rounded-lg text-lg py-2 bg-gray-200' value={formData.email} onChange={handleChange} required autoComplete='off'/>
            <input type="password" placeholder='Enter Your Password' name='password' className='text-gray-800 px-4 rounded-lg text-lg py-2 bg-gray-200' value={formData.password} onChange={handleChange} required autoComplete='off'/>
            <button type='submit' className='px-4 rounded-lg text-gray-800 text-lg py-2 bg-green-500 text-white'>{loading ? 'Loading...':'Login'}</button>
          </form>
          <p className='text-lg'>Don't have an account ? <Link to={"/register"} className='underline text-blue-500'>Register Here</Link></p>
        </div>
      </section>

  )
}

export default Login
