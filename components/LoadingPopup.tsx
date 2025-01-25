export default function LoadingPopup({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full border-t-4 border-gray-300 dark:border-gray-600 w-12 h-12 mb-4"></div>
        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
          Loading...
        </p>
      </div>
    </div>
  );
}
