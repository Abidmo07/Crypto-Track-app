import { Crypto } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CryptoStore {
  cryptos: Crypto[];
  favorites: Crypto[];
  fetchList: () => Promise<void>;
  addFavorite: (crypto: Crypto) => void;
  deleteFromFavorite: (favId: Crypto["id"]) => void;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      cryptos: [],
      favorites: [],
      fetchList: async () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-ttjV2VJ1bopyqLPPgh4PVJGf ",
          },
        };

        fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
          options
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            set({ cryptos: res });
          })
          .catch((err) => console.error(err));
      },
      addFavorite: (crypto) => {
        set((state) => {
          const exist = state.favorites.find((fav) => fav.id === crypto.id);

          if (exist) {
            console.log("Already in favorites");
            return state; 
          }

          return {
            favorites: [...state.favorites, crypto],
          };
        });
      },

      deleteFromFavorite: (favId: Crypto["id"]) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== favId),
        }));
      },
    }),
    {
      name: "crypto-storage",
    }
  )
);
