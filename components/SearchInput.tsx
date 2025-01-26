export default function SearchInput({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  return (
    <div className="relative max-w-[900px] mx-auto mt-4">
      <input
        type="text"
        placeholder="Search by coin name or symbol..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full h-[3.5em] px-4 pr-12 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 "
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m1.1-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
