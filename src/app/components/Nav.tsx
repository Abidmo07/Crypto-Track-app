// CryptoNavbar.tsx
import Link from "next/link";
import React from "react";
import { FaBitcoin, FaChartLine, FaWallet,  } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export default function CryptoNavbar() {
  return (
    <nav className="backdrop-blur-lg bg-gradient-to-r from-gray-900/85 via-purple-900/90 to-indigo-950/90 shadow-xl px-6 py-3 fixed top-0 inset-x-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 p-2 rounded-full shadow-md">
            <FaBitcoin className="text-gray-900 text-2xl animate-pulse" />
          </span>
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-yellow-200 via-yellow-400 to-pink-400 tracking-wider drop-shadow-lg font-sans select-none">
            CryptoTrack
          </span>
        </div>
        {/* Links */}
        <div className="hidden md:flex gap-9">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-semibold text-white/90 hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-pink-400/20 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <FaChartLine className="text-yellow-300" /> Markets
          </a>
       
          <Link
            href="/favorites"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-semibold text-white/90 hover:bg-gradient-to-r hover:from-pink-400/25 hover:to-indigo-400/25 transition focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <MdFavorite className="text-pink-300" /> Favorites
          </Link>
        </div>
        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-3xl cursor-pointer hover:text-yellow-400 transition-colors" aria-label="Open mobile menu">
          ☰
        </div>
      </div>
    </nav>
  );
}