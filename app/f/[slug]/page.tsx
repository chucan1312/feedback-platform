interface Props {
    params: { slug: string };
  }
  
  export default function PublicFormPage({ params }: Props) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">
          Form: {params.slug}
        </h1>
  
        <p className="mt-2 text-gray-600">
          Public form renderer goes here.
        </p>
      </main>
    );
  }