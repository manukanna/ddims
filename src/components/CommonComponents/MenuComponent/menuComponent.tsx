import Cookies from 'js-cookie';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MenuDropdown = () => {
    const {loggedInUser} = useSelector((state: any) => state.loggedUserDetails);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => setIsOpen((prev) => !prev);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const logout = () => {
        Cookies.remove('authToken');
        Cookies.remove('tokenExpiry');
        navigate('/')
    }
    return (
        <div ref={dropdownRef} className="relative inline-block text-left rounded-full bg-fuchsia-900 text-white ">

            <button
                onClick={toggleDropdown}
                className="px-2 py-1 h-8 w-8 uppercase"
            >
               {loggedInUser?.firstName?.charAt(0)}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 z-99 px-2 py-2">
                    <div className='flex justify-between items-center border-b-1 border-gray-300'>
                        <div className='text-fuchsia-900 text-sm capitalize'>{loggedInUser?.userType} profile</div>
                        <div>
                            <button onClick={logout} className="block w-auto text-sm text-gray-700">
                                <span className="material-symbols-outlined mx-2">power_settings_new</span>
                                {/* <span>Logout</span> */}
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-row items-center text-fuchsia-900 text-center mb-2 mt-2 font-bold'>
                        <div className='h-15 w-15 border rounded-full flex items-center justify-center me-2 uppercase'>{loggedInUser?.firstName.charAt(0) + '#'}</div>
                        <div className='text-left'>
                            <div>{loggedInUser?.firstName + ' ' + loggedInUser?.lastName}</div>
                            <div className='font-normal'>{loggedInUser?.email}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
