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
      <div className="flex flex-col min-h-screen py-4 px-2 md:py-12 md:px-8">
        <h1 className="font-black uppercase text-xl md:text-2xl text-gray-600 mb-1">
          My Applications
        </h1>
        <p className="text-gray-600 mb-4">
          See all jobs for which you have applied.
        </p>
        <div className="w-full bg-white p-2 md:p-4">
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
            <div className="flex flex-col gap-2 md:flex-row mt-4 p-5 w-full border-b-[1px]">
              <div className="flex md:justify-start w-full text-gray-500">
                {job.dateApplied}
              </div>
              <div className="flex md:justify-start w-full cursor-pointer font-semibold">
                {trimJobTitle(job.jobTitle, 35)}
              </div>
              <div className="flex md:justify-end w-full text-gray-500 cursor-pointer">
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
