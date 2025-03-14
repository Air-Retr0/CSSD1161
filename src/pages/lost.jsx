export default function Lost() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center space-y-4">
      <p className="text-9xl font-bold">404</p>
      <p className="text-lg text-gray-400">
        Route not found,{" "}
        <a href="/" className="text-blue-500 hover:underline">
          return home?
        </a>
      </p>
    </div>
  );
}
