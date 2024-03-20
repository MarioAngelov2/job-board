const EmptyAppliedJobs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 py-4 md:py-12 md:px-8">
      <h1 className="mb-1 text-xl font-black text-gray-600 uppercase md:text-2xl">
        My Applications
      </h1>
      <p className="mb-4 text-gray-600">
        You have not applied to any jobs yet.
      </p>
    </div>
  );
};

export default EmptyAppliedJobs;
