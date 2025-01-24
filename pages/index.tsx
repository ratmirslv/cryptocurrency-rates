import { fetchRates } from "@/lib/api/fetchRates";
import { useQuery } from "@tanstack/react-query";

//const MAIN_CURRENCY = "usd";

export default function MainPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["rates"],
    queryFn: fetchRates,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading rates</div>;

  return (
    <div>
      <h1>Cryptocurrency rates</h1>
      <ul>
        {data?.map((currency) => (
          <li key={currency.currencyName}>{currency.currencyName}</li>
        ))}
      </ul>
    </div>
  );
}
