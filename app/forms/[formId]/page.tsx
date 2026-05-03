interface Props {
    params: { formId: string };
  }
  
  export default function FormPage({ params }: Props) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">
          Edit Form: {params.formId}
        </h1>
      </main>
    );
  }