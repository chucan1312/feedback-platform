export default function DashboardPage() {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
  
        <p className="mt-2 text-gray-600">
          Your forms will appear here.
        </p>
  
        <a
          href="/forms/new"
          className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Create New Form
        </a>
      </main>
    );
  }