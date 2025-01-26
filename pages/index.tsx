import CurrencyTable from "@/components/CurrencyTable";
import ErrorMessage from "@/components/ErrorMessage";
import Header from "@/components/Header";
import LoadingPopup from "@/components/LoadingPopup";
import SearchInput from "@/components/SearchInput";
import { fetchRates } from "@/lib/api/fetchRates";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MainPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["rates"],
    queryFn: fetchRates,
    staleTime: 2 * 60 * 1000,
    gcTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((crypt) => {
    const search = searchTerm.trim().toLowerCase();
    return (
      crypt.name.toLowerCase().includes(search) ||
      crypt.symbol.toLowerCase().includes(search)
    );
  });

  if (isError) return <ErrorMessage onRetry={refetch} />;

  return (
    <div className="pt-8 px-5 pb-4 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      <Header />
      <LoadingPopup isLoading={isLoading} />
      <SearchInput onSearch={setSearchTerm} />
      {filteredData && <CurrencyTable currencyData={filteredData} />}
    </div>
  );
}
