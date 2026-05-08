import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{ formId: string }>;
}

export default async function FormWorkspaceLayout({
  children,
  params,
}: Props) {
  const { formId } = await params;

  const form = await prisma.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });

  if (!form) {
    notFound();
  }

  return (
    <main className="p-6">
      <div className="rounded-xl border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{form.title}</h1>
            <p className="text-sm text-zinc-500">
              {form._count.responses} responses
            </p>
          </div>

          <Link
            href="/dashboard"
            className="text-sm text-zinc-500 hover:text-black"
          >
            Back to dashboard
          </Link>
        </div>

        <nav className="mt-6 flex gap-3 border-b pb-3">
          <Link href={`/forms/${formId}/edit`}>Edit</Link>
          <Link href={`/forms/${formId}/responses`}>Responses</Link>
          <Link href={`/forms/${formId}/analysis`}>Analysis</Link>
        </nav>

        <section className="mt-6">{children}</section>
      </div>
    </main>
  );
}