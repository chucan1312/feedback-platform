import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

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
                    <div
                        key={form.id}
                        className="rounded-xl border p-4"
                    >
                        <h2 className="font-medium">{form.title}</h2>
                        <p className="text-sm text-zinc-500">
                            {form._count.responses} responses
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}