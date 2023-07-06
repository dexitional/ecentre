'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="my-4 mx-auto px-4 py-4 md:py-2 w-full max-w-lg rounded md:rounded-full border border-blue-950/20 bg-slate-100 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-10">
      <h2 className="text-lg font-medium text-blue-950/80">Something went wrong!</h2>
      <button className="px-4 py-2 rounded border border-slate-200 bg-slate-200 text-sm text-gray-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}