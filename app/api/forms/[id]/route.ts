import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        const form = await prisma.form.findUnique({
            where: {
                id,
            },
        });

        if (!form) {
            return Response.json(
                { error: "Form not found" },
                { status: 404 }
            );
        }

        // Security check
        if (form.userId !== userId) {
            return Response.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        const deletedForm = await prisma.form.delete({
            where: {
                id,
            },
        });

        return Response.json(deletedForm);

    } catch (error) {
        console.error("DELETE FORM ERROR:", error);

        return Response.json(
            {
                error: "Failed to delete form",
            },
            { status: 500 }
        );
    }
}