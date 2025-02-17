import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrencies } from "../contexts/CurrenciesContext";
import {
  dollarFormatter,
  euroFormatter,
  ruppeeFormatter,
} from "../lib/formatter";
import { useSettings } from "../contexts/SettingsContext";
import { useNavigate } from "react-router";

type Props = {
  search: string;
};

export default function Crypto({ search }: Props) {
  const { coinValues } = useCurrencies();
  const { order } = useSettings();

  const filteredCoinValues = useMemo(() => {
    return coinValues
      .sort((a, b) =>
        order === "price"
          ? -a.current_price + b.current_price
          : a.name >= b.name
          ? 1
          : -1
      )
      .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
  }, [coinValues, order, search]);

  return (
    <div className="mt-4 mx-4 crypto-grid">
      <AnimatePresence>
        {filteredCoinValues.map((coin, idx) => (
          <CryptoCard
            key={idx}
            name={coin.name}
            image={coin.image}
            price={coin.current_price}
            drop={coin.price_change_24h}
            symbol={coin.symbol}
            marketCap={coin.market_cap}
            id={coin.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

type CryptoProps = {
  image: string;
  name: string;
  price: number;
  drop: number;
  symbol: string;
  marketCap: number;
  id: string;
};

function CryptoCard({
  name,
  image,
  symbol,
  price,
  marketCap,
  drop,
  id,
}: CryptoProps) {
  const { currency } = useSettings();
  const { eur, inr, usd } = useCurrencies();
  const navigate = useNavigate();

  const formatter = useMemo(() => {
    if (currency === "EURO") return euroFormatter;
    else if (currency === "INR") return ruppeeFormatter;
    else if (currency === "USD") return dollarFormatter;
    else return dollarFormatter;
  }, [currency]);
  const scale = useMemo(() => {
    if (currency === "EURO") return eur;
    else if (currency === "INR") return inr;
    else if (currency === "USD") return usd;
    else return usd;
  }, [currency]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex flex-col py-2 w-fit items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={() => navigate(`/${id}`)}
    >
      <img
        className="rounded-t-lg h-24 w-24 md:rounded-none md:rounded-s-lg ml-4"
        src={image}
        alt=""
        loading="lazy"
      />
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <div className="mb-2 w-full flex items-center gap-5">
          <div>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name.length >= 20 ? `${name.substring(0, 20)}...` : name}
            </span>
            <span className="text-xl tracking-tight text-gray-500 dark:text-gray-400 ml-1">
              ({symbol.toLocaleUpperCase()})
            </span>
          </div>
          <div className="ml-auto">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {formatter.format(price * scale)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-gray-500 dark:text-gray-400">
            {formatter.format(marketCap * scale)}
          </span>
          <p
            className={`w-full text-end ${
              drop >= 0
                ? "dark:text-green-400 text-green-600"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {formatter.format(drop * scale)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
