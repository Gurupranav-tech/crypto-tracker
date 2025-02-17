import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";

export default function Filters() {
  return (
    <div className="mt-4 mx-4 flex items-center">
      <OrdersDropdown />
      <CurrencyDropdown />
    </div>
  );
}

function CurrencyDropdown() {
  const [show, setShow] = useState(false);
  const { currency, changeCurrency } = useSettings();

  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener("click", () => setShow(false), {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, []);

  return (
    <div className="ml-auto relative">
      <button
        className="capitalize text-black bg-slate-200 dark:bg-gray-700 dark:text-white cursor-pointer mb-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow((s) => !s);
        }}
      >
        {currency}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <motion.div
        animate={{
          scale: show ? 1 : 0,
          opacity: show ? 1 : 0,
          translateY: show ? 0 : "-50%",
        }}
        onClick={(e) => e.stopPropagation()}
        className={`absolute -left-[80%] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer"
          aria-labelledby="dropdownDefaultButton"
        >
          <li
            onClick={() => changeCurrency("USD")}
            className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            USD
          </li>
          <li
            onClick={() => changeCurrency("EURO")}
            className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            EURO
          </li>
          <li
            onClick={() => changeCurrency("INR")}
            className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            INR
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

function OrdersDropdown() {
  const [show, setShow] = useState(false);
  const { order, changeOrder } = useSettings();

  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener("click", () => setShow(false), {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, []);

  return (
    <div className="relative">
      <button
        className="capitalize text-black bg-slate-200 dark:bg-gray-700 dark:text-white cursor-pointer mb-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShow((s) => !s);
        }}
      >
        {order}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <motion.div
        animate={{
          scale: show ? 1 : 0,
          opacity: show ? 1 : 0,
          translateY: show ? 0 : "-50%",
        }}
        onClick={(e) => e.stopPropagation()}
        className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200 *:cursor-pointer"
          aria-labelledby="dropdownDefaultButton"
        >
          <li
            onClick={() => changeOrder("price")}
            className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Price
          </li>
          <li
            onClick={() => changeOrder("A-z")}
            className="block text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            A-z
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
