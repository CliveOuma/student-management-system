import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr"; 
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:5000/auth/logout')
            .then(result => {
                if (result.data.status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                } else {
                    alert(result.data.Error);
                }
            });
    };

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="flex flex-col sm:flex-row">
            {/* Toggle button for small screens */}
            <div className="sm:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
                <h4 className="text-lg font-semibold">Admin Dashboard</h4>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <GrClose className="text-2xl" /> : <GiHamburgerMenu className="text-2xl" />}
                </button>
            </div>
            {/* Sidebar */}
            <div ref={menuRef} className={`w-64 bg-gray-800 text-white min-h-screen sm:flex flex-col ${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
                {/* Display only on large screens */}
                <div className="px-4 py-3 flex items-center justify-between hidden sm:block">
                    <Link to="/dashboard" className="text-lg font-semibold text-white">
                        Admin Dashboard
                    </Link>
                </div>
                <ul className="space-y-2 mt-4">
                    <li onClick={handleLinkClick}>
                        <Link to="/dashboard" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md">
                            <AiFillHome className="text-lg" />
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </li>
                    <li onClick={handleLinkClick}>
                        <Link to="/dashboard/Manage_Student" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md">
                            <FaUserFriends className="text-lg" />
                            <span className="ml-2">Manage Students</span>
                        </Link>
                    </li>
                    <li onClick={() => { handleLogout(); handleLinkClick(); }}>
                        <Link to="/dashboard/logout" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 rounded-md">
                            <RiLogoutBoxFill className="text-lg" />
                            <span className="ml-2">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex-1" onClick={() => setIsMenuOpen(false)}>
                <div className="p-3 bg-white shadow-md flex justify-center">
                    <h4 className="text-lg font-semibold">Student Management System</h4>
                </div>
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
