import { CurrencyRate } from "@/lib/api/fetchRates";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";

type CoinProps = {
  currencyData: CurrencyRate;
};

function Coin({ currencyData }: Readonly<CoinProps>) {
  const isNegativeTrend =
    currencyData?.charts[0] >
    currencyData?.charts[currencyData.charts.length - 1];
  const trendColor = isNegativeTrend ? "text-red-500" : "text-green-500";

  return (
    <div className="overflow-x-auto mt-6 max-w-[900px] mx-auto p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            width={50}
            height={50}
            className="rounded-full h-[50px] w-[50px]"
            src={currencyData.image}
            alt={currencyData.name}
          />
          <div>
            <h2 className="text-lg font-semibold">
              {currencyData?.name || "Unknown"}
            </h2>
            <p className="text-sm text-gray-500">
              {currencyData?.symbol?.toUpperCase() || "N/A"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`${trendColor} text-sm font-medium`}>
            {isNegativeTrend ? "▼" : "▲"}{" "}
            {currencyData?.charts
              ? (
                  ((currencyData.charts[currencyData.charts.length - 1] -
                    currencyData.charts[0]) /
                    currencyData.charts[0]) *
                  100
                ).toFixed(2)
              : "N/A"}
            %
          </p>
        </div>
      </div>

      <Sparklines data={currencyData?.charts || []} width={300} height={50}>
        <SparklinesLine color={isNegativeTrend ? "red" : "green"} />
      </Sparklines>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-sm">
          <p className="text-gray-500">Rate:</p>
          <p className="font-medium">
            {currencyData?.usd?.rate ? `$${currencyData.usd.rate}` : "N/A"}
          </p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Ask:</p>
          <p className="font-medium">
            {currencyData?.usd?.ask ? `$${currencyData.usd.ask}` : "N/A"}
          </p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">Bid:</p>
          <p className="font-medium">
            {currencyData?.usd?.bid ? `$${currencyData.usd.bid}` : "N/A"}
          </p>
        </div>
        <div className="text-sm">
          <p className="text-gray-500">24h Diff:</p>
          <p
            className={`font-medium ${
              currencyData?.usd?.diff24h != null && currencyData.usd.diff24h < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {currencyData?.usd?.diff24h != null
              ? `${currencyData.usd.diff24h}%`
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Coin;
