export default function HomePage() {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">Anonymous Feedback</h1>
        <p className="mt-2 text-gray-600">
          Collect honest feedback easily.
        </p>
  
        <div className="mt-6">
          <a
            href="/dashboard"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Get Started
          </a>
        </div>
      </main>
    );
  }