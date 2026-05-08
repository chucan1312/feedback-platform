export type QuestionType =
    | "text"
    | "textarea"
    | "rating";

export type BuilderQuestion = {
    id: string; // temporary frontend id
    text: string;
    type: QuestionType;
    required: boolean;
    order: number;
};

export type PublicQuestion = {
    id: string;
    text: string;
    type: QuestionType;
    required: boolean;
    order: number;
};

export type FormAnswers = Record<string, string>;

export type PublicForm = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    questions: PublicQuestion[];
};

export type FormWithResponseCount = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    createdAt: Date;
    _count: {
        responses: number;
    };
};

export type CreateFormBody = {
    title: string;
    description: string;
    questions: BuilderQuestion[];
};

export type SubmitResponseBody = {
    answers: FormAnswers;
};