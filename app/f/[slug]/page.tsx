import PublicFormRenderer from "@/app/components/PublicFormRenderer";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { PublicForm, QuestionType } from "@/app/types/form-builder";

interface Props {
  params: Promise<{ slug: string }>;
}

function isQuestionType(type: string): type is QuestionType {
  return ["text", "textarea", "rating", "mcq"].includes(type);
}

export default async function PublicFormPage({ params }: Props) {
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
      type: isQuestionType(question.type) ? question.type : "text",
      required: question.required,
      order: question.order,
      options: Array.isArray(question.options)
        ? question.options.filter((option) => typeof option === "string")
        : [],
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Feedback form</p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
            {publicForm.title}
          </h1>

          {publicForm.description && (
            <p className="mt-3 text-sm leading-6 text-gray-600">
              {publicForm.description}
            </p>
          )}
        </div>

        <PublicFormRenderer
          form={publicForm}
          questions={publicForm.questions}
        />
      </div>
    </main>
  );
}