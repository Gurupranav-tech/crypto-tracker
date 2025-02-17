import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type Currency = "USD" | "INR" | "EURO";

type Context = {
  order: "price" | "A-z";
  currency: Currency;

  changeOrder: (order: Context["order"]) => void;
  changeCurrency: (currency: Currency) => void;
};

const context = createContext<Context>({} as any);

export function useSettings() {
  return useContext(context);
}

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: order, setValue: setOrder } = useLocalStorage<
    Context["order"]
  >("order", "price");
  const { value: currency, setValue: setCurrency } = useLocalStorage<Currency>(
    "currency",
    "USD"
  );

  const changeOrder = (order: Context["order"]) => setOrder(order);

  const changeCurrency = (currency: Currency) => setCurrency(currency);

  const values = {
    order,
    currency,

    changeOrder,
    changeCurrency,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}
