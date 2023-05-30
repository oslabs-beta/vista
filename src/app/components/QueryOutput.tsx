export function QueryOutput() {
  return (
    <div className="mt-3">
      <h1>Query output:</h1>
      <textarea rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Query results go here..." readOnly />
    </div>
  )
}