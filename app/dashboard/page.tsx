import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import DeleteFormButton from "../components/DeleteFormButton";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Not signed in</div>;
  }

  const forms = await prisma.form.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { responses: true },
      },
    },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="mt-6 space-y-4">
        {forms.map((form) => (
          <Link
            key={form.id}
            href={`/forms/${form.id}/edit`}
            className="block rounded-xl border p-4 hover:bg-zinc-50"
          >
            <h2 className="font-medium">{form.title}</h2>

            <p className="text-sm text-zinc-500">
              {form._count.responses} responses
            </p>

            <div className="mt-3">
              <DeleteFormButton formId={form.id} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}