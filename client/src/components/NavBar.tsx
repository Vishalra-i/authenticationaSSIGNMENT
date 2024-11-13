'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import LogoutButton from './Logout';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 md:p-6 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link  href="/dashboard">
         <h1 className="text-4xl font-extrabold">Healthynfinity</h1>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none" aria-label="Toggle Menu">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        <div className={`flex flex-col md:flex-row  md:items-center absolute md:static z-20 top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full md:translate-x-0 opacity-0 md:opacity-100'}`}>

            <div className="space-y-4 md:space-y-0 md:space-x-5 mt-4 md:mt-0 p-4 md:p-0 w-full md:w-auto">
              <Link href="/log">
                <Button className="w-full md:w-auto font-semibold bg-blue-500 hover:bg-blue-300">
                  Logs
                </Button>
              </Link>
              <LogoutButton/>
            </div>
          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;