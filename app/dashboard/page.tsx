import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import DeleteFormButton from "../components/DeleteFormButton";
import CopyLinkButton from "../components/CopyLinkButton";

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
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage your feedback forms and share them with respondents.
                        </p>
                    </div>

                    <Link
                        href="/forms/new"
                        className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        New form
                    </Link>
                </div>

                {forms.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <h2 className="text-lg font-semibold text-gray-900">
                            No forms yet
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Create your first feedback form to start collecting responses.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {forms.map((form) => {
                            const publicPath = `feedback-platform-theta.vercel.app/f/${form.slug}`;

                            return (
                                <div
                                    key={form.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <Link
                                            href={`/forms/${form.id}/edit`}
                                            className="min-w-0 flex-1"
                                        >
                                            <h2 className="truncate text-lg font-semibold text-gray-900">
                                                {form.title}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {form._count.responses} responses
                                            </p>
                                        </Link>

                                        <DeleteFormButton formId={form.id} />
                                    </div>

                                    <div className="mt-4 rounded-xl bg-gray-50 p-3">
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                            Public link
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 truncate rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                                                {publicPath}
                                            </code>

                                            <CopyLinkButton link={publicPath} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}