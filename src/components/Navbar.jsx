import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


const Navbar = () => {

    const context = useContext(AuthContext);
    const isAuthenticated = context.isAuthenticated;
    const setIsAuthenticated = context.setIsAuthenticated;

    

    const logoutHandler = async () => {
        try {
            await axios.get("https://to-do-app-by-mern-stack.vercel.app/user/logout", 
                {
                    withCredentials: true
                }
            )
            setIsAuthenticated(false);
        } catch (error) {
            toast.error("Error found")
            setIsAuthenticated(false);
        }
    };



    return (
        <div className='flex items-center justify-between bg-black text-white px-4 py-2'>
            <div>
                TODO App
            </div>
            <div className='flex items-center space-x-5'>
                <Link to='/' className='px-3 hover:bg-white hover:text-black'>Home</Link>
                <Link to='/profile' className='px-3 hover:bg-white hover:text-black'>Profile</Link>
                {
                    isAuthenticated ? <button onClick={logoutHandler} className='px-3 hover:bg-white hover:text-black'>Logout</button> : <Link to='/login' className='px-3 hover:bg-white hover:text-black'>Login</Link>
                }
            </div>
        </div>
    )
}

export default Navbar
