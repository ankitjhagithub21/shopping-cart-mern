const getUserFromServer = async() =>{
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`,{
        credentials:'include'
    })
    const data = await res.json()

    return data
}

export default getUserFromServer