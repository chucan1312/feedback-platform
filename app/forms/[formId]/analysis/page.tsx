import { getInsights } from "@/app/lib/getInsights";

export const dynamic = "force-dynamic";

type Theme = {
  label: string;
  count: number;
  examples: unknown[];
};

export default async function FormAnalysisPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const themes: Theme[] = await getInsights(formId);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Analysis</h1>
        <p className="text-sm text-gray-500">
          Automatically grouped themes from survey responses.
        </p>
      </div>

      {themes.length === 0 ? (
        <div className="rounded-lg border p-6 text-gray-500">
          No insights yet. Submit a few responses first.
        </div>
      ) : (
        <div className="grid gap-4">
          {themes.map((theme, index) => (
            <div key={index} className="rounded-xl border p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold capitalize">
                  {theme.label}
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {theme.count} response{theme.count === 1 ? "" : "s"}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  Example responses
                </p>

                {theme.examples.map((example, i) => (
                  <pre
                    key={i}
                    className="overflow-x-auto rounded-lg bg-gray-50 p-3 text-sm"
                  >
                    {JSON.stringify(example, null, 2)}
                  </pre>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}