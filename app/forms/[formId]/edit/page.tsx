import FormEditor from "@/app/components/FormEditor";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { QuestionType } from "@/app/types/form-builder";

interface Props {
  params: Promise<{ formId: string }>;
}

function isQuestionType(type: string): type is QuestionType {
  return ["text", "textarea", "rating"].includes(type);
}

export default async function FormPage({ params }: Props) {
  const { formId } = await params;

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

  const formForEditor = {
    id: form.id,
    title: form.title,
    description: form.description,
    questions: form.questions.map((question) => ({
      id: question.id,
      text: question.text,
      type: isQuestionType(question.type) ? question.type : "text",
      required: question.required,
      order: question.order,
    })),
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">
        Edit Form: {form.title}
      </h1>

      <FormEditor
        form={formForEditor}
        hasResponses={form._count.responses > 0}
      />
    </main>
  );
}