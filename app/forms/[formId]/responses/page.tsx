interface Props {
    params: { formId: string };
  }
  
  export default function ResponsesPage({ params }: Props) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">
          Responses for {params.formId}
        </h1>
  
        <p className="mt-2 text-gray-600">
          Analytics + responses will go here.
        </p>
      </main>
    );
  }