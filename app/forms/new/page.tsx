"use client";
import QuestionCard from '@/app/components/QuestionCard';
import { BuilderQuestion } from '@/app/types/form-builder';
import { SetStateAction, useState } from 'react'

type QuestionCardProps = {
    question: BuilderQuestion;

    onChange: (updatedQuestion: BuilderQuestion) => void;
    onDelete: (id: string) => void;
};

export default function NewFormPage() {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<BuilderQuestion[]>([]);
    const [description, setDescription] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<string>>
      ) => {
        setter(e.target.value);
      };

      async function publishForm() {
        const res = await fetch("/api/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            questions,
          }),
        });
      
        const data = await res.json();
      
        if (!res.ok) {
          throw new Error(data.error || "Failed to save form");
        }
      
        window.location.href = `/forms/${data.id}`;
      }

    return (
        <main className="p-6 flex flex-col">
            <h1 className="text-2xl font-semibold">Create Form</h1>

            <p className="mt-2 text-gray-600">
                Form builder UI goes here.
            </p>
            <input
                type="text"
                value={title}
                onChange={(e) => handleChange(e, setTitle)}
                className="border"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => handleChange(e, setDescription)}
                className="border"
            />
            {questions.map((q) => (
                <QuestionCard
                    key={q.id}
                    question={q}
                    onChange={(updated) => {
                        setQuestions((prev) =>
                            prev.map((item) =>
                                item.id === updated.id ? updated : item
                            )
                        );
                    }}
                    onDelete={(id) => {
                        setQuestions((prev) =>
                            prev.filter((item) => item.id !== id)
                        );
                    }}
                />
            ))}
            <button onClick={() => setQuestions(prev => [...prev, {
                id: crypto.randomUUID(),
                text: "",
                type: "text",
                required: true,
                order: prev.length + 1,
            },])}
                className="bg-red">
                Add question +
            </button>
            <button onClick={publishForm}>
                Publish form
            </button>
        </main>
    );
}
