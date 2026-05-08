import { prisma } from "@/app/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;
  
      if (!id) {
        return Response.json(
          { error: "Form ID is required" },
          { status: 400 }
        );
      }
  
      const body = await req.json();
  
      const answers = body.answers;
  
      if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
        return Response.json(
          { error: "Answers must be an object" },
          { status: 400 }
        );
      }
  
      const form = await prisma.form.findUnique({
        where: {
          id,
        },
      });
  
      if (!form || !form.isActive) {
        return Response.json(
          { error: "Form not found" },
          { status: 404 }
        );
      }
  
      const response = await prisma.response.create({
        data: {
          formId: id,
          answers,
        },
      });
  
      return Response.json(response, { status: 201 });
    } catch (error) {
      console.error("CREATE RESPONSE ERROR:", error);
  
      return Response.json(
        { error: "Failed to submit response" },
        { status: 500 }
      );
    }
  }