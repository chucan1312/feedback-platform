import similarity from "compute-cosine-similarity";

type SurveyResponse = {
    id: string;
    answers: unknown;
    embedding: number[];
};

export function clusterResponses(responses: SurveyResponse[]) {
    const clusters: SurveyResponse[][] = [];
    const used = new Set<string>();

    for (const response of responses) {
        if (used.has(response.id)) continue;

        const cluster = [response];
        used.add(response.id);

        for (const other of responses) {
            if (used.has(other.id)) continue;

            const score = similarity(response.embedding, other.embedding);

            if (score && score > 0.8) {
                cluster.push(other);
                used.add(other.id);
            }
        }

        clusters.push(cluster);
    }

    return clusters.sort((a, b) => b.length - a.length);
}

const stopwords = new Set([
    "the", "and", "that", "this", "with", "from", "have", "they",
    "would", "there", "their", "about", "because", "really", "just",
    "question", "answer"
]);

export function labelCluster(texts: string[]) {
    const counts: Record<string, number> = {};

    for (const text of texts) {
        const words = text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .split(/\s+/)
            .filter((word) => word.length > 3 && !stopwords.has(word));

        for (const word of words) {
            counts[word] = (counts[word] || 0) + 1;
        }
    }

    return (
        Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([word]) => word)
            .join(" / ") || "General feedback"
    );
}