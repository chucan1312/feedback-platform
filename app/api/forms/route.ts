import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

function slugify(title: string) {
    const base = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const suffix = crypto.randomUUID().slice(0, 8);

    return `${base || "untitled"}-${suffix}`;
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Parse request body
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

        // Validate title
        if (!title) {
            return Response.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        let form;

        for (let attempt = 0; attempt < 5; attempt++) {
            try {
                // Create form in Neon through Prisma
                form = await prisma.form.create({
                    data: {
                        userId,
                        title,
                        description,
                        slug: slugify(title),

                        questions: {
                            create: questions.map(
                                (
                                    q: {
                                        text?: string;
                                        type?: string;
                                        required?: boolean;
                                        options?: unknown;
                                    },
                                    index: number
                                ) => {
                                    const type =
                                        typeof q.type === "string" ? q.type : "text";

                                    const options =
                                        type === "mcq" && Array.isArray(q.options)
                                            ? q.options.filter(
                                                (option): option is string =>
                                                    typeof option === "string" && option.trim() !== ""
                                            )
                                            : undefined;

                                    return {
                                        text: typeof q.text === "string" ? q.text : "",
                                        type,
                                        required: Boolean(q.required),
                                        order: index + 1,
                                        options,
                                    };
                                }
                            ),
                        },
                    },

                    include: {
                        questions: true,
                    },
                });

                break;
            } catch (error) {
                if (
                    error instanceof Prisma.PrismaClientKnownRequestError &&
                    error.code === "P2002"
                ) {
                    continue;
                }

                throw error;
            }
        }

        if (!form) {
            return Response.json(
                { error: "Could not generate a unique slug" },
                { status: 500 }
            );
        }

        return Response.json(form, { status: 201 });

    } catch (error) {
        console.error("CREATE FORM ERROR:", error);

        return Response.json(
            {
                error: "Failed to create form",
            },
            { status: 500 }
        );
    }
}