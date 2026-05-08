import { prisma } from "@/app/lib/prisma";
import { clusterResponses, labelCluster } from "@/app/lib/clustering";

function parseVector(vector: string): number[] {
  return vector
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map(Number);
}

function answersToText(answers: unknown) {
  return JSON.stringify(answers);
}

export async function getInsights(formId: string) {
  const responses = await prisma.$queryRaw<
    {
      id: string;
      answers: unknown;
      embedding: string;
    }[]
  >`
    SELECT id, answers, embedding::text
    FROM "Response"
    WHERE "formId" = ${formId}
    AND embedding IS NOT NULL
  `;

  const parsed = responses.map((response) => ({
    id: response.id,
    answers: response.answers,
    embedding: parseVector(response.embedding),
  }));

  const clusters = clusterResponses(parsed);

  const themes = clusters.map((cluster) => {
    const texts = cluster.map((item) => answersToText(item.answers));

    return {
      label: labelCluster(texts),
      count: cluster.length,
      examples: cluster.slice(0, 3).map((item) => item.answers),
    };
  });

  return themes;
}