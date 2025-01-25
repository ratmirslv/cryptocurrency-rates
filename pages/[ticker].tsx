import Coin from "@/components/Coin";
import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import LoadingPopup from "@/components/LoadingPopup";
import { fetchRates } from "@/lib/api/fetchRates";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const CoinDetails = () => {
  const { query } = useRouter();
  const { ticker } = query;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["rates"],
    queryFn: fetchRates,
    staleTime: 2 * 60 * 1000,
    gcTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isError) return <ErrorMessage onRetry={refetch} />;

  const currentCoin = data?.filter((coin) => coin.symbol === ticker)[0];

  return (
    <div className="pt-8 px-5 pb-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <LoadingPopup isLoading={isLoading} />
      {currentCoin && <Coin currencyData={currentCoin} />}
    </div>
  );
};

export default CoinDetails;
