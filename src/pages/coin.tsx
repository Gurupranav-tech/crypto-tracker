import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useCurrencies } from "../contexts/CurrenciesContext";
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { IoMdArrowBack } from "react-icons/io";
import { useSettings } from "../contexts/SettingsContext";
import {
  euroFormatter,
  ruppeeFormatter,
  dollarFormatter,
  dateFormatter,
} from "../lib/formatter";
import { useTheme } from "../contexts/ThemeContext";
import useScreenType from "../hooks/useScreenType";

const url =
  "https://api.coingecko.com/api/v3/coins/:r/market_chart?vs_currency=:c&days=10";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
};

export default function Coin() {
  const { coin } = useParams();
  const { currency: choosenCurrency } = useSettings();
  const { coinValues, eur, inr, usd } = useCurrencies();
  const { theme } = useTheme();
  const coinsHistory = useQuery({
    queryKey: ["coins-history"],
    queryFn: async () => {
      const res = await fetch(
        url.replace(":c", choosenCurrency).replace(":r", coin || ""),
        options
      );
      return await res.json();
    },
  });
  const navigate = useNavigate();
  const { currency } = useSettings();
  const screen = useScreenType();

  const coinData = useMemo(
    () => coinValues.find((c) => c.id === coin),
    [coin, coinValues]
  );
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
  const chartConfig = useMemo(() => {
    return {
      type: "line",
      height: screen === "desktop" ? "auto" : "550px",
      series: [
        {
          name: coinData?.name || "",
          data: coinsHistory.data?.prices.map((price: any) => price[1] * scale),
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: true,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: [theme === "light" ? "oklch(0.623 0.214 259.815)" : "#1447e6"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: coinsHistory.data?.prices.map((price: any) =>
            dateFormatter.format(new Date(price[0] * 1000))
          ),
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: false,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme,
        },
      },
    };
  }, [theme, formatter, scale, screen]);

  if (coinsHistory.isFetching) return <p>Loading...</p>;

  return (
    <div className="mt-4 mx-4">
      <div className="flex items-center">
        <IoMdArrowBack
          className="dark:text-white font-bold text-3xl cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-center text-3xl dark:text-white font-bold w-full">
          {coinData?.name}
        </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row mt-6">
        <div className="flex flex-col gap-2">
          <span className="dark:text-gray-400 text-gray-500">
            {coinData?.name} Price
          </span>
          <h3 className="text-4xl font-bold dark:text-white">
            {formatter.format((coinData?.current_price || 0) * scale)}
          </h3>
          <p className="dark:text-gray-400 text-gray-500">
            Last 24hrs:
            <span
              className={`w-full text-end ${
                coinData?.price_change_24h || 0 >= 0
                  ? "dark:text-green-400 text-green-600"
                  : "text-red-600 dark:text-red-400"
              } ml-2`}
            >
              {formatter.format(coinData?.price_change_24h || 0 * scale)}
            </span>
          </p>
        </div>
        <div className="mx-auto md:ml-autp w-32 h-32">
          <img src={coinData?.image} alt="Image of Crypto" />
        </div>
      </div>
      {!coinsHistory.isLoading && chartConfig.series[0].data && (
        <Chart {...(chartConfig as any)} />
      )}
    </div>
  );
}
