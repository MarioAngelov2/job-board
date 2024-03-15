import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchSavedJobs, selectSavedJobs } from "../redux/jobs/jobSlice";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SavedJobs = () => {
  const trimJobTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const job = useSelector(selectSavedJobs);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    dispatch(fetchSavedJobs(userId));
  }, [dispatch, userId]);

  console.log(job);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen px-2 py-4 md:py-12 md:px-8">
        <h1 className="mb-1 text-xl font-black text-gray-600 uppercase md:text-2xl">
          Saved Jobs
        </h1>
        <p className="mb-4 text-gray-600">
          See all jobs that have been saved for viewing later.
        </p>
        <div className="w-full p-2 bg-white md:p-4">
          <div className="hidden md:gap-8 md:grid md:grid-cols-4 justify-evenly">
            <div className="flex flex-col">
              <p className="text-gray-500">Date of saving</p>
            </div>
            <div className="flex flex-col md:items-start">
              <p className="text-gray-500">Job</p>
            </div>
            <div className="flex flex-col md:items-start">
              <p className="text-gray-500">Company</p>
            </div>
          </div>
          {job.map((job) => (
            <div
              key={job.jobId}
              className="flex flex-col gap-2 md:gap-8 md:flex-row mt-4 py-5 w-full border-b-[1px]"
            >
              <div className="flex w-full text-gray-500 md:justify-start">
                {new Date(job.datePosted).toLocaleDateString()}
              </div>
              <div onClick={() => navigate(`/job/${job.jobId}`)} className="flex w-full font-semibold cursor-pointer md:justify-start">
                {trimJobTitle(job.jobTitle, 35)}
              </div>
              <div className="flex w-full text-gray-500 cursor-pointer md:justify-start">
                {job.company}
              </div>
              <div className="flex w-full text-gray-500 cursor-pointer md:justify-start">
                <Button className="h-8 mt-3 md:mt-0" variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SavedJobs;
