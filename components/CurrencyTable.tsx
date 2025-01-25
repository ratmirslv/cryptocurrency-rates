import { CurrencyRates } from "@/lib/api/fetchRates";
import Link from "next/link";

type CurrencyTableProps = {
  currencyData: CurrencyRates;
};

function CurrencyTable({ currencyData }: CurrencyTableProps) {
  return (
    <div className="overflow-x-auto max-w-[900px] mx-auto">
      <table className="w-full border-collapse relative font-normal mt-6">
        <thead>
          <tr
            className="h-[4.2em] border-t border-b border-gray-100 dark:border-gray-700
        text-sm sticky top-0 bg-white dark:bg-gray-900 "
          >
            <th className="text-center">#</th>
            <th className="text-left">Coin</th>
            <th className="text-center">Price</th>
            <th className="text-center">24h Chart</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.map((crypt) => (
            <tr
              key={crypt.order}
              className="h-[4.2em] border-b border-gray-100 dark:border-gray-700
                  text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50
                  dark:hover:bg-gray-800 transition-colors duration-100"
            >
              <td className="text-center font-semibold">{crypt.order}.</td>

              <td className="px-1">
                <Link
                  href={crypt.symbol}
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <img
                    className="rounded-full h-[30px] w-[30px]"
                    src={crypt.image}
                    alt={crypt.name}
                  />
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {crypt.name}
                  </p>
                  <p className="text-sm font-semibold uppercase">
                    {crypt.symbol}
                  </p>
                </Link>
              </td>

              <td className="text-center px-1">
                $
                {crypt.usd?.ask.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </td>

              <td className="text-center px-1"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyTable;
