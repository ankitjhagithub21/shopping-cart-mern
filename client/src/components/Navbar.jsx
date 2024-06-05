import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../app/slices/authSlice';
import toast from 'react-hot-toast';
import { CiLight, CiDark, CiMenuBurger } from 'react-icons/ci';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      dispatch(setUser(null));
      toast.success(data.message);
      navigate('/login');
    }
  };

  return (
    <header className={`shadow fixed w-full z-50 top-0 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <nav className="container mx-auto lg:p-5 px-1 py-2 flex justify-between items-center">
        <Link className="text-xl font-bold" to="/">
          Shopping Cart
        </Link>
        <button className="md:hidden visible absolute right-10" onClick={() => setIsOpen(!isOpen)}>
          <CiMenuBurger size={25} />
        </button>
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row gap-5 items-start md:items-center w-full md:w-auto p-3 md:p-0 ${
            isDarkMode ? 'bg-black' : 'bg-white'
          } md:relative absolute md:top-0 top-10`}
        >
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {user ? (
            <>
              <Link to="/cart">Cart</Link>
              <button className="px-4 py-1 bg-red-500 text-white rounded-lg" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
        <button className="px-2 py-1 text-xl" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <CiLight size={25} /> : <CiDark size={25} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
