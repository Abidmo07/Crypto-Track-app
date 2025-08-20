"use client";
import { useCryptoStore } from "@/store/crypto.store";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";

export default function CryptoContent() {
  const router = useRouter();
  const { cryptos, fetchList, addFavorite } = useCryptoStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Filter
  const filtredList = useMemo(() => {
    return cryptos.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.symbol?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cryptos]);

  // Pagination
  const totalPages = Math.ceil(filtredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filtredList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pt-28 sm:pt-32 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 px-3 sm:px-6">
      {/* Title */}
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-black mb-8 bg-gradient-to-tr from-yellow-200 via-yellow-400 to-pink-400 text-transparent bg-clip-text font-mono tracking-tight">
        Track Your Favorite Cryptocurrencies
      </h1>

      {/* Search */}
      <div className="relative mb-8 sm:mb-10 mx-auto w-full sm:w-4/5 md:w-1/2">
        <input
          type="text"
          placeholder="Search for a coin..."
          aria-label="Search for a coin"
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3 pl-11 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg border border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-base sm:text-lg font-medium placeholder-gray-400 transition"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300 text-lg sm:text-xl" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900/85 to-gray-800/90">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-yellow-300 text-xs sm:text-sm md:text-lg font-bold">
              <th className="py-3 sm:py-4 pl-6 sm:pl-8 pr-3 sm:pr-4 text-left">
                #
              </th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 text-left">Coin</th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 text-left">Price</th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 text-left">24h</th>
              <th className="py-3 sm:py-4 px-3 sm:px-4 text-left">Market Cap</th>
              <th className="py-3 sm:py-4 pr-6 sm:pr-8 pl-3 sm:pl-4 text-center">
                Fav
              </th>
            </tr>
          </thead>
          <tbody className="text-white">
            {paginatedList.map((crypto, index) => (
              <tr
                key={crypto.id}
                className="group border-b border-gray-800 hover:bg-gradient-to-r hover:from-yellow-400/5 hover:to-pink-400/5 transition"
              >
                <td className="py-3 sm:py-4 pl-6 sm:pl-8 pr-3 sm:pr-4 font-bold">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 sm:py-4 px-3 sm:px-4 flex items-center gap-2 font-semibold">
                  <img
                    src={crypto.image}
                    alt={crypto.symbol}
                    className="w-6 h-6 sm:w-7 sm:h-7 shadow-lg rounded-full"
                  />
                  <span className="hidden xs:inline">
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </span>
                  <span className="xs:hidden">{crypto.symbol.toUpperCase()}</span>
                </td>
                <td className="py-3 sm:py-4 px-3 sm:px-4 text-yellow-200">
                  ${crypto.current_price.toLocaleString()}
                </td>
                <td
                  className={`py-3 sm:py-4 px-3 sm:px-4 font-bold ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="py-3 sm:py-4 px-3 sm:px-4">
                  ${crypto.market_cap.toString().substring(0, 3)}B
                </td>
                <td className="py-3 sm:py-4 pr-6 sm:pr-8 pl-3 sm:pl-4 text-center">
                  <button
                    onClick={() => {
                      addFavorite(crypto);
                      router.push("/favorites");
                    }}
                    className="p-1.5 sm:p-2 rounded-full hover:bg-yellow-400/20 transition"
                  >
                    <FaStar className="text-yellow-400 text-lg sm:text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition text-sm sm:text-base"
        >
          Prev
        </button>
        <span className="text-yellow-300 font-semibold text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-700 transition text-sm sm:text-base"
        >
          Next
        </button>
      </div>
    </div>
  );
}
