import { BuilderQuestion } from "../types/form-builder";

type Props = {
    question: BuilderQuestion;
    onChange: (q: BuilderQuestion) => void;
    onDelete: (id: string) => void;
};

export default function QuestionCard({
    question,
    onChange,
    onDelete,
}: Props) {
    return (
        <div>
            {/* Question text */}
            <input
                value={question.text}
                onChange={(e) =>
                    onChange({
                        ...question,
                        text: e.target.value,
                    })
                }
            />

            {/* Type selector */}
            <select
                value={question.type}
                onChange={(e) =>
                    onChange({
                        ...question,
                        type: e.target.value as BuilderQuestion["type"],
                    })
                }
            >
                <option value="text">Text</option>
                <option value="textarea">Textarea</option>
            </select>

            {/* Required toggle */}
            <input
                type="checkbox"
                checked={question.required}
                onChange={(e) =>
                    onChange({
                        ...question,
                        required: e.target.checked,
                    })
                }
            />

            {/* Delete */}
            <button onClick={() => onDelete(question.id)}>
                Delete
            </button>
        </div>
    );
}