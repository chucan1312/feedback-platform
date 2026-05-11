import { prisma } from "../prisma"

function toPgVector(vector: number[]) {
    return `[${vector.join(",")}]`;
}

export async function retrieveRelevantResponses({
    formId,
    queryEmbedding,
    limit = 5,
}: {
    formId: string;
    queryEmbedding: number[];
    limit?: number;
}) {
    const vector = toPgVector(queryEmbedding);

    const results = await prisma.$queryRaw<
        {
            id: string;
            answers: unknown;
            similarity: number;
        }[]
    >`
    SELECT
        id,
        answers,
        1 - (embedding <=> ${vector}::vector) as similarity
    FROM "Response"
    WHERE "formId" = ${formId}
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${limit};
  `;

    return results;
}