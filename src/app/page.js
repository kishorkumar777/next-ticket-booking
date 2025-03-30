export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl mx-auto text-center bg-white shadow-md rounded-lg p-12 border border-gray-300">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome to <span className="text-blue-600">Bannerghatta Zoo</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Discover wildlife like never before. Book your tickets now for an unforgettable safari experience.
        </p>
        <div className="mt-6">
          <a 
            href="./booking" 
            className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-md text-lg shadow-sm">
            Book Tickets
          </a>
        </div>
      </div>
    </main>
  );
}