import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ShoppingBagIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import { useThemeStore } from "../store/useThemeStore.js";

function Navbar() {
  const {pathname} = useLocation();
  const isHomePage = pathname === "/";

  // const {theme, setTheme}= useThemeStore();
  // console.log(theme);
  

  return (
    <div className="bg-base-100/80 backdrop-blur-lg  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* logo */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
              <ShoppingCart className="w-9 h-9 text-primary" />
              <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                STORE
              </span>
            </Link>
          </div>
           <div className="flex items-center gap-4">
          <ThemeSelector /> 

          {isHomePage && (
            <div className='indicator'>
              <div className='p-2 rounded-full hover:bg-base-200 transition-colors'>
                <ShoppingBagIcon className='size-5' />
                <span className="badge badge-sm badge-primary indicator-item">8</span>
              </div>
            </div>
          ) }   
       </div>
        </div>
       
      </div>
    </div>
  );
}

export default Navbar;
