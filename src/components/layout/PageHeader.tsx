interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-xl text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}