import { createEmbedding } from "@/app/lib/embeddings";
import { prisma } from "@/app/lib/prisma";
import { buildContext } from "@/app/lib/rag/buildContext";
import { generateAnswer } from "@/app/lib/rag/generateAnswer";
import { retrieveRelevantResponses } from "@/app/lib/rag/retrieve";
import { auth } from "@clerk/nextjs/server";

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

    const formId =
      typeof body.formId === "string"
        ? body.formId.trim()
        : "";

    const question =
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    // Validate 
    if (!formId) {
        console.log("form id missing");
      return Response.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    if (!question) {
        console.log("question missing");
        return Response.json(
            {error: "Question is required"},
            {status: 400}
        )
    }

    const form = await prisma.form.findFirst({
        where: {
          id: formId,
          userId,
        },
        select: {
          id: true,
        },
      });
      
      if (!form) {
        return Response.json(
          { error: "Form not found" },
          { status: 404 }
        );
      }

    const queryEmbedding = await createEmbedding(question);

    const relevantResponses = await retrieveRelevantResponses({
        formId,
        queryEmbedding,
        limit: 8,
    });

    if (relevantResponses.length === 0) {
        return Response.json({
          answer: "I couldn't find enough relevant feedback to answer that.",
          sources: [],
        });
      }
    
    const context = await buildContext(relevantResponses)

    const answer = await generateAnswer({
        question, 
        context
    })

    return Response.json({
        answer,
        sources: relevantResponses,
      });

  } catch (error) {
    console.error("CREATE QUESTION ERROR:", error);

    return Response.json(
      {
        error: "Failed to create question",
      },
      { status: 500 }
    );
  }
}