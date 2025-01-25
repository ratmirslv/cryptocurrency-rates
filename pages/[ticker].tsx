import { useRouter } from "next/router";

const CoinDetails = () => {
  const { query } = useRouter();
  const { ticker } = query;

  return (
    <div>
      <h1>{ticker}</h1>
    </div>
  );
};

export default CoinDetails;
