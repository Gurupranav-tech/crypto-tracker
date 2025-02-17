import { createContext, useContext, useMemo } from "react";
import { Currencies } from "../types/currencies";
import { useQuery } from "@tanstack/react-query";
import { Coins } from "../types/coins";

type Context = {
  loading: boolean;
  currencies: { [key: string]: number };
  eur: number;
  usd: number;
  inr: number;

  coinValues: Coins[];
};

const context = createContext<Context>({} as any);

export function useCurrencies() {
  return useContext(context);
}

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
};

export default function CurrenciesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currencyValues = useQuery<Currencies>({
    queryKey: ["currency"],
    queryFn: async () => {
      const res = await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
      );
      return await res.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 5 * 60 * 1000,
  });

  const coinValues = useQuery<Coins[]>({
    queryKey: ["coins"],
    queryFn: async () => {
      const res = await fetch(url, options);
      return await res.json();
    },
    refetchIntervalInBackground: true,
    refetchInterval: 5 * 60 * 1000,
  });

  const eur = useMemo(
    () => currencyValues.data?.usd.eur || 0,
    [currencyValues.data]
  );
  const inr = useMemo(
    () => currencyValues.data?.usd.inr || 0,
    [currencyValues.data]
  );

  const values = {
    loading: currencyValues.isFetching || coinValues.isFetching,
    currencies: currencyValues.data?.usd || {},
    usd: 1,
    eur,
    inr,
    coinValues: coinValues.data || [],
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}
