export type BuilderQuestion = {
    id: string; // temporary frontend id
    text: string;
    type: "text" | "textarea" | "rating";
    required: boolean;
    order: number;
};