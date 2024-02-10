import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateJobForm from "@/components/CreateJobForm";


const CreateJob = () => {
  return (
    <MaxWidthWrapper className="p-0">
      <div className="flex items-center h-14 bg-[#2663EB]">
        <h1 className="pl-4 text-xl font-semibold tracking-wide text-white uppercase">
          Job Listing Form
        </h1>
      </div>
      <div className="flex flex-col min-h-screen px-2 md:px-0">
        <CreateJobForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default CreateJob;
