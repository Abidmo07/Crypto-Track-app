"use client"

import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import CryptoNavbar from "../components/Nav";
import { useCryptoStore } from "@/store/crypto.store";

export default function FavoritesPage() {
    // Real state (use actual logic in production)
    const favorites = useCryptoStore((state) => state.favorites);
    const deleteFromFavorite = useCryptoStore((state) => state.deleteFromFavorite);

    useEffect(() => {
        console.log("favorites updated:", favorites);
    }, [favorites]);

    const isFavorite = favorites && favorites.length > 0;

    return (
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 min-h-screen w-full relative overflow-x-hidden">
            {/* Subtle cyberpunk bottom glow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-pink-700 via-yellow-500/60 to-transparent blur-2xl opacity-30 z-0" />

            <CryptoNavbar />

            <div className="relative z-10 max-w-7xl mx-auto py-28 px-4">
                {/* Section Title */}
                <div className="flex items-center gap-4 mb-10 select-none">
                    <span className="bg-gradient-to-br from-yellow-400 via-pink-400 to-indigo-400 p-4 rounded-2xl shadow-2xl animate-pulse ring-2 ring-yellow-400/30">
                        <FaStar className="text-white text-3xl drop-shadow-lg" />
                    </span>
                    <h1 className="text-5xl font-black font-mono leading-tight bg-gradient-to-r from-yellow-200 via-pink-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl tracking-wide">
                        My Favorites
                    </h1>
                </div>

                {/* Empty State */}
                {!isFavorite && (
                    <div className="relative bg-gradient-to-br from-gray-900/80 to-black/70 border border-gray-800/60 px-8 py-20 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-5 backdrop-blur-md mb-10">
                        {/* Floating neon star */}
                        <span className="animate-bounce bg-gradient-to-br from-yellow-300 via-pink-400 to-pink-600 p-6 rounded-full shadow-2xl mb-3">
                            <FaStar className="text-white text-5xl drop-shadow-xl" />
                        </span>
                        <p className="text-3xl font-extrabold bg-gradient-to-br from-yellow-300 via-pink-400 to-indigo-500 bg-clip-text text-transparent">
                            No favorites yet!
                        </p>
                        <p className="text-gray-400 text-lg">
                            Go to <span className="text-yellow-300 font-bold">Markets</span> and star your coins to build your favorites list.
                        </p>
                    </div>
                )}

                {/* Favorites Table */}
                {isFavorite && (
                    <div className="overflow-x-auto bg-gradient-to-tr from-gray-950/95 via-gray-900/90 to-gray-800/80 border border-gray-800/60 rounded-3xl shadow-2xl ring-1 ring-yellow-300/10 backdrop-blur-lg">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-yellow-300 text-lg font-bold tracking-wider">
                                    <th className="py-6 px-8 text-left rounded-tl-3xl">#</th>
                                    <th className="py-6 px-8 text-left">Coin</th>
                                    <th className="py-6 px-8 text-left">Price</th>
                                    <th className="py-6 px-8 text-left">24h</th>
                                    <th className="py-6 px-8 text-left">Market Cap</th>
                                    <th className="py-6 px-8 text-left rounded-tr-3xl">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-white text-lg font-medium">
                                {favorites.map((fav, i) => (
                                    <tr
                                        key={fav.id}
                                        className="group border-b border-gray-800/70 last:border-none hover:bg-gradient-to-r hover:from-yellow-400/10 hover:via-pink-300/10 hover:to-indigo-500/10 transition-all duration-200 shadow-sm"
                                    >
                                        <td className="py-6 px-8 font-black text-lg">{i + 1}</td>
                                        <td className="py-6 px-8 flex items-center gap-4 font-semibold">
                                            <img
                                                src={fav.image}
                                                alt={fav.symbol}
                                                className="w-9 h-9 rounded-full shadow-lg border border-gray-800 bg-gray-950"
                                            />
                                            <span>
                                                <span className="font-bold text-white">{fav.name}</span>
                                                <span className="text-xs font-mono text-gray-400 ml-2">({fav.symbol.toUpperCase()})</span>
                                            </span>
                                        </td>
                                        <td className="py-6 px-8 text-yellow-100 font-mono">${fav.current_price}</td>
                                        <td className={`py-6 px-8 font-bold ${fav.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {fav.price_change_percentage_24h >= 0 ? "+" : ""}
                                            {fav.price_change_percentage_24h}%
                                        </td>
                                        <td className="py-6 px-8">${String(fav.market_cap).slice(0, 3)}B</td>
                                        <td className="py-6 px-8">
                                            <button
                                                onClick={() => deleteFromFavorite(fav.id)}
                                                className="transition-all text-base shadow-xl bg-gradient-to-r from-yellow-300 via-pink-300 to-indigo-400 text-gray-900 font-bold px-5 py-2 rounded-xl hover:bg-yellow-400 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-400/40"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}