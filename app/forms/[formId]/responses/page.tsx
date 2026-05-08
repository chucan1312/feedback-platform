import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ formId: string }>;
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 1;

export default async function FormResponsesPage({
  params,
  searchParams,
}: Props) {
  const { formId } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(Number(page || "1"), 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!form) {
    notFound();
  }

  const totalResponses = await prisma.response.count({
    where: {
      formId,
    },
  });

  const responses = await prisma.response.findMany({
    where: {
      formId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: PAGE_SIZE,
  });

  const totalPages = Math.max(
    Math.ceil(totalResponses / PAGE_SIZE),
    1
  );

  const response = responses[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Responses</h2>
        <p className="text-sm text-zinc-500">
          {totalResponses} total responses
        </p>
      </div>

      {!response ? (
        <p className="text-zinc-500">
          No responses yet.
        </p>
      ) : (
        <div className="rounded-xl border p-4 space-y-4">
          <div className="text-sm text-zinc-500">
            Response {currentPage} of {totalResponses}
          </div>

          <div className="text-sm text-zinc-500">
            Submitted:{" "}
            {response.createdAt.toLocaleString()}
          </div>

          <div className="space-y-4">
            {form.questions.map((question) => {
              const answers =
                response.answers as Record<string, unknown>;

              const answer = answers[question.id];

              return (
                <div
                  key={question.id}
                  className="rounded-lg border p-3"
                >
                  <p className="font-medium">
                    {question.text}
                  </p>

                  <p className="mt-2 text-zinc-700">
                    {typeof answer === "string" &&
                    answer.trim()
                      ? answer
                      : "No answer"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Link
          href={`/forms/${formId}/responses?page=${currentPage - 1}`}
          className={
            currentPage <= 1
              ? "pointer-events-none rounded-lg border px-3 py-2 text-zinc-400"
              : "rounded-lg border px-3 py-2 hover:bg-zinc-50"
          }
        >
          Previous
        </Link>

        <span className="text-sm text-zinc-500">
          Page {currentPage} of {totalPages}
        </span>

        <Link
          href={`/forms/${formId}/responses?page=${currentPage + 1}`}
          className={
            currentPage >= totalPages
              ? "pointer-events-none rounded-lg border px-3 py-2 text-zinc-400"
              : "rounded-lg border px-3 py-2 hover:bg-zinc-50"
          }
        >
          Next
        </Link>
      </div>
    </div>
  );
}