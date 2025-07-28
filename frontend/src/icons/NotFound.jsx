function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-20 h-20 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L15 12m0 0l-5.25-5M15 12H3"
        />
      </svg>
      <h2 className="text-3xl font-semibold mb-2">Blog Not Found</h2>
      <p className="text-center max-w-sm">
        Sorry, we couldn't find the blog you are looking for. It might have been
        removed or the link is broken.
      </p>
    </div>
  );
}

export default NotFound;
