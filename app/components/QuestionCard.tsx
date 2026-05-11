import { BuilderQuestion } from "../types/form-builder";

type Props = {
  question: BuilderQuestion;
  onChange: (q: BuilderQuestion) => void;
  onDelete: (id: string) => void;
};

export default function QuestionCard({ question, onChange, onDelete }: Props) {
  const options = question.options ?? [];

  function addOption() {
    onChange({
      ...question,
      options: [...options, ""],
    });
  }

  function updateOption(index: number, value: string) {
    onChange({
      ...question,
      options: options.map((option, i) => (i === index ? value : option)),
    });
  }

  function deleteOption(index: number) {
    onChange({
      ...question,
      options: options.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Question {question.order}
          </p>
          <h3 className="text-base font-semibold text-gray-900">
            Configure question
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onDelete(question.id)}
          className="rounded-lg px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Question text
          </label>
          <input
            value={question.text}
            onChange={(e) =>
              onChange({
                ...question,
                text: e.target.value,
              })
            }
            placeholder="e.g. How was your experience?"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Answer type
            </label>
            <select
              value={question.type}
              onChange={(e) =>
                onChange({
                  ...question,
                  type: e.target.value as BuilderQuestion["type"],
                  options:
                    e.target.value === "mcq"
                      ? question.options ?? ["", ""]
                      : undefined,
                })
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            >
              <option value="text">Short answer</option>
              <option value="textarea">Long answer</option>
              <option value="mcq">Multiple choice</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
              <span>
                <span className="block text-sm font-medium text-gray-700">
                  Required
                </span>
                <span className="text-xs text-gray-500">
                  Respondents must answer this
                </span>
              </span>

              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) =>
                  onChange({
                    ...question,
                    required: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
            </label>
          </div>
        </div>

        {question.type === "mcq" && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Answer choices
                </p>
                <p className="text-xs text-gray-500">
                  Add the options respondents can choose from.
                </p>
              </div>

              <button
                type="button"
                onClick={addOption}
                className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Add option
              </button>
            </div>

            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-500">
                    {index + 1}
                  </div>

                  <input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                  />

                  <button
                    type="button"
                    onClick={() => deleteOption(index)}
                    disabled={options.length <= 1}
                    className="rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {question.type === "rating" && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">
              Rating preview
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Respondents will choose a rating from 1 to 10.
            </p>

            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <div
                  key={rating}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  {rating}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}