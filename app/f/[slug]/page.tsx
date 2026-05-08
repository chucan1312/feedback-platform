import PublicFormRenderer from "@/app/components/PublicFormRenderer";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { PublicForm, QuestionType } from "@/app/types/form-builder";

interface Props {
    params: Promise<{ slug: string }>;
}

function isQuestionType(type: string): type is QuestionType {
    return ["text", "textarea", "rating"].includes(type);
}

export default async function PublicFormPage({
    params,
}: Props) {
    const { slug } = await params;

    const form = await prisma.form.findUnique({
        where: {
            slug,
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

    const publicForm: PublicForm = {
        id: form.id,
        slug: form.slug,
        title: form.title,
        description: form.description,
        questions: form.questions.map((question) => ({
            id: question.id,
            text: question.text,
            type: isQuestionType(question.type)
                ? question.type
                : "text",
            required: question.required,
            order: question.order,
        })),
    };

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold">
                {publicForm.title}
            </h1>

            {publicForm.description && (
                <p className="mt-2 text-zinc-600">
                    {publicForm.description}
                </p>
            )}

            <PublicFormRenderer
                form={publicForm}
                questions={publicForm.questions}
            />
        </main>
    );
}