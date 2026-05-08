import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";

interface Props {
    params: Promise<{ slug: string }>;
}
  
  export default async function Thanks({ params }: Props) {

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
        
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">
          Thanks for filing out form: {form.title}
        </h1>
  
      </main>
    );
  }