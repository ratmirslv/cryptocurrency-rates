type ErrorMessageProps = {
  onRetry: () => void; // Функция без аргументов, ничего не возвращает
};

export default function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg mb-6">
          Failed to load data. Please check your network connection and try
          again.
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
