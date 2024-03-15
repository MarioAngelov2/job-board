import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const jobData = [
  {
    dateApplied: "2023-12-23",
    jobTitle: "Software Engineer",
    company: "Google",
  },
  {
    dateApplied: "2024-01-10",
    jobTitle: "Junior Front-end Developer",
    company: "DXC",
  },
  {
    dateApplied: "2024-01-22",
    jobTitle: "FullStack Developer (Typescript, Node.JS, React)",
    company: "WebThree",
  },
];

const MyJobs = () => {
  const trimJobTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen px-2 py-4 md:py-12 md:px-8">
        <h1 className="mb-1 text-xl font-black text-gray-600 uppercase md:text-2xl">
          My Applications
        </h1>
        <p className="mb-4 text-gray-600">
          See all jobs for which you have applied.
        </p>
        <div className="w-full p-2 bg-white md:p-4">
          <div className="hidden md:grid md:grid-cols-3 md:gap-4">
            <div className="flex flex-col">
              <p className="text-gray-500">Date of application</p>
            </div>
            <div className="flex flex-col md:items-start">
              <p className="text-gray-500">Job</p>
            </div>
            <div className="flex flex-col md:items-end">
              <p className="text-gray-500">Company/Intermediary</p>
            </div>
          </div>
          {jobData.map((job) => (
            <div
              key={job.dateApplied}
              className="flex flex-col gap-2 md:flex-row mt-4 py-5 w-full border-b-[1px]"
            >
              <div className="flex w-full text-gray-500 md:justify-start">
                {job.dateApplied}
              </div>
              <div className="flex w-full font-semibold cursor-pointer md:justify-start">
                {trimJobTitle(job.jobTitle, 35)}
              </div>
              <div className="flex w-full text-gray-500 cursor-pointer md:justify-end">
                {job.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default MyJobs;
