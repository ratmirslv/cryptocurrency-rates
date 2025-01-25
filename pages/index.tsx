import CurrencyTable from "@/components/CurrencyTable";
import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import LoadingPopup from "@/components/LoadingPopup";
import { fetchRates } from "@/lib/api/fetchRates";
import { useQuery } from "@tanstack/react-query";

export default function MainPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["rates"],
    queryFn: fetchRates,
  });

  if (isError) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="pt-8 px-5 pb-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      <Header />
      <LoadingPopup isLoading={isLoading} />
      {data && <CurrencyTable currencyData={data} />}
    </div>
  );
}
