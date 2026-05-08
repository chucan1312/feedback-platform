import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(
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

    if (!id) {
      return Response.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    const existingForm = await prisma.form.findUnique({
      where: { id },
      include: {
        questions: true,
        _count: {
          select: {
            responses: true,
          },
        },
      },
    });

    if (!existingForm) {
      return Response.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    if (existingForm.userId !== userId) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : "";

    const description =
      typeof body.description === "string"
        ? body.description.trim()
        : "";

    const questions = Array.isArray(body.questions)
      ? body.questions
      : [];

    if (!title) {
      return Response.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const hasResponses =
      existingForm._count.responses > 0;

    const updatedForm = await prisma.$transaction(async (tx) => {
      await tx.form.update({
        where: { id },
        data: {
          title,
          description,
        },
      });

      if (hasResponses) {
        // Existing responses: only safe question edits
        for (const q of questions) {
          if (typeof q.id !== "string") continue;

          const existingQuestion =
            existingForm.questions.find(
              (question) => question.id === q.id
            );

          if (!existingQuestion) continue;

          await tx.question.update({
            where: {
              id: q.id,
            },
            data: {
              text:
                typeof q.text === "string"
                  ? q.text
                  : existingQuestion.text,

              required:
                typeof q.required === "boolean"
                  ? q.required
                  : existingQuestion.required,
            },
          });
        }
      } else {
        // No responses: full structural editing allowed
        await tx.question.deleteMany({
          where: {
            formId: id,
          },
        });

        await tx.question.createMany({
          data: questions.map(
            (
              q: {
                text?: string;
                type?: string;
                required?: boolean;
              },
              index: number
            ) => ({
              formId: id,
              text:
                typeof q.text === "string"
                  ? q.text
                  : "",
              type:
                typeof q.type === "string"
                  ? q.type
                  : "text",
              required:
                typeof q.required === "boolean"
                  ? q.required
                  : true,
              order: index + 1,
            })
          ),
        });
      }

      return tx.form.findUnique({
        where: { id },
        include: {
          questions: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    });

    return Response.json(updatedForm);
  } catch (error) {
    console.error("UPDATE FORM ERROR:", error);

    return Response.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}