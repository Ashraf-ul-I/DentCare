function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-red-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
        />
      </svg>
      <h2 className="text-2xl font-semibold mb-2">
        Oops! Something went wrong.
      </h2>
      <p className="text-center max-w-md">
        {message || "Failed to load blog."}
      </p>
    </div>
  );
}
export default ErrorMessage;
