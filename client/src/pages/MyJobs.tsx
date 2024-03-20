import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  fetchAppliedJobs,
  selectApplications,
} from "../redux/jobs/applicationSlice";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { trimJobTitle } from "../utils/trimText";

const MyJobs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();
  const applications = useSelector(selectApplications);

  useEffect(() => {
    if (!userId) return;

    dispatch(fetchAppliedJobs(userId));
  }, [dispatch, userId]);

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
          {applications.map((application) => (
            <div
              key={application.id}
              className="flex flex-col gap-2 md:flex-row mt-4 py-5 w-full border-b-[1px]"
            >
              <div className="flex w-full text-gray-500 md:justify-start">
                {application.dateApplied}
              </div>
              <div className="flex w-full font-semibold cursor-pointer md:justify-start">
                {trimJobTitle(application.jobTitle, 35)}
              </div>
              <div className="flex w-full text-gray-500 cursor-pointer md:justify-end">
                {application.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default MyJobs;
