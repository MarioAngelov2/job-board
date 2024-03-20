import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  CiCalendarDate,
  CiClock2,
  CiLocationOn,
  CiHeart,
} from "react-icons/ci";
import { PiMoneyLight } from "react-icons/pi";
import { BsSuitcaseLg } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { formatDistance } from "date-fns";
import ApplyDialog from "@/components/ApplyDialog";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobById,
  selectFetchById,
  selectSavedJobs,
  fetchSavedJobs,
  saveJob,
} from "../redux/jobs/jobSlice";
import { useParams } from "react-router-dom";
import { FetchedJob } from "../types/index";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import JobDetailsSkeleton from "@/components/JobsDetailsSkeleton";

const JobDetails = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [showTopNav, setShowTopNav] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const id = useParams().id;
  const job = useSelector(selectFetchById);
  const savedJobs = useSelector(selectSavedJobs);
  const { userId } = useAuth();

  // SHOWS MOBILE NAV ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowTopNav(scrollPosition > 450);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FETCHES JOB BY ID
  useEffect(() => {
    setLoading(true);

    if (id) {
      dispatch(fetchJobById(id)).then(() => setLoading(false));
    }

    if (userId) {
      dispatch(fetchSavedJobs(userId));
    }
  }, [dispatch, id, userId]);

  // SAVES USER'S JOB TO DATABASE
  const handleSaveJob = (userId: string | undefined | null, jobId: string) => {
    if (!userId) return;

    const isJobSaved = savedJobs.some((job) => job.jobId === jobId);

    if (isJobSaved || isSaved) {
      toast.error("You have already saved this job");
      return;
    }

    dispatch(saveJob({ userId, jobId }));
    setIsSaved(true);

    toast.success("Job saved successfully");
  };

  if (loading) {
    return <JobDetailsSkeleton />;
  }

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen px-2">
        {job.map((job: FetchedJob) => (
          <React.Fragment key={job.id}>
            <section>
              <div
                className="flex flex-row gap-6 p-3.5 rounded-md bg-gradient-to-r from-white to-blue-100 
          py-6 mt-12 items-center"
              >
                <div className="flex items-center">
                  <div className="max-w-[200px] md:p-4">
                    <img
                      src={job.logo}
                      alt="company logo"
                      className=" object-contain max-h-[40px] md:max-h-[60px] w-[90px] md:w-[200px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 md:text-md">
                    {job.company}
                  </p>
                  <p className="font-semibold text-md md:text-2xl md:w-[350px]">
                    {job.jobTitle}
                  </p>
                  <div className="flex flex-row gap-4">
                    <div className="items-center hidden gap-1 text-gray-500 md:flex">
                      <p className="text-sm md:text-base">
                        {job.employmentType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="justify-end hidden w-full lg:flex">
                  <ApplyDialog
                    jobId={id}
                    className="gap-2 w-[230px] h-[45px] text-lg"
                  >
                    <LuSend className="text-2xl" />
                    Apply
                  </ApplyDialog>
                </div>
              </div>
            </section>
            {/* SECOND SECTION */}
            <section>
              <div className="px-6 py-4 mt-6 bg-white rounded-md">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-slate-500">{job.company}</p>
                  <p className="text-xl font-semibold">{job.jobTitle}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-1 md:flex-row">
                    <div className="flex items-center gap-1 text-gray-500">
                      <CiClock2 className="text-lg lg:text-lg" />
                      <p className="text-sm md:text-base">
                        {job.employmentType}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <CiLocationOn className="text-lg lg:text-2xl" />
                      <p className="text-sm md:text-base">{job.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <PiMoneyLight className="text-xl lg:text-2xl" />
                      <p className="text-sm md:text-base">
                        {job.salaryRange} BGN
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <BsSuitcaseLg className="text-md lg:text-xl" />
                      <p className="text-sm md:text-base">
                        {job.seniorityType}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <CiCalendarDate className="text-xl lg:text-2xl" />
                      <p className="text-sm md:text-base">
                        Published:{" "}
                        {formatDistance(new Date(), new Date(job.datePosted))}{" "}
                        ago
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-4 md:flex-row">
                    <ApplyDialog jobId={id} className="mt-0 mb-0 lg:hidden">
                      <LuSend className="text-xl" />
                      Apply
                    </ApplyDialog>
                    <Button
                      onClick={() => handleSaveJob(userId, job.id)}
                      className="flex items-center gap-2 w-full md:w-[300px]"
                    >
                      <CiHeart className="text-xl" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            {/* THIRD SECTION */}
            <section className="relative">
              {/* MOBILE ADDITIONAL NAV */}
              {showTopNav && (
                <div className="fixed left-0 w-full bg-white top-12 h-18 lg:hidden">
                  <div className="flex flex-row items-center justify-center gap-4 px-4 py-4">
                    <ApplyDialog
                      jobId={id}
                      className="flex items-center w-full md:w-[300px] gap-2 mt-0 mb-0"
                    >
                      <LuSend className="text-lg" />
                      Apply
                    </ApplyDialog>
                    <Button
                      onClick={() => handleSaveJob(userId, job.id)}
                      className="flex items-center gap-2 w-full md:w-[300px] h-9"
                    >
                      <CiHeart className="text-xl" />
                      Save
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex flex-col mt-12">
                <div className="flex flex-col items-start">
                  <h1 className="text-xl font-bold md:text-2xl">Our Culture</h1>
                  <p className="mt-2 text-slate-500 tracking-wide leading-7 text-sm md:text-base max-w-full md:max-w-[900px]">
                    {job.aboutUs}
                  </p>
                </div>
              </div>
              <hr className="mt-8 mb-8 border-gray-300" />
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold md:text-2xl">
                  Daily Challenges
                </h1>
                <p className="mt-2 text-slate-500 tracking-wide leading-7 text-sm md:text-base max-w-full md:max-w-[900px]">
                  {job.tasks}
                </p>
              </div>
              <hr className="mt-8 mb-8 border-gray-300" />
              <div className="flex flex-col items-start">
                <h1 className="text-xl font-bold md:text-2xl">Your profile</h1>
                {job.requirements.map((reqirements: string) => (
                  <li
                    key={reqirements}
                    className="mt-2 text-slate-500 tracking-wide leading-7 text-sm md:text-base max-w-full md:max-w-[900px]"
                  >
                    {reqirements}
                  </li>
                ))}
              </div>
              <hr className="mt-8 mb-8 border-gray-300" />
              <div className="flex flex-col items-start mb-12">
                <h1 className="text-xl font-bold md:text-2xl">We Offer</h1>
                {job.benefits.map((benefits: string) => (
                  <li
                    key={benefits}
                    className="mt-2 text-slate-500 tracking-wide leading-7 text-sm md:text-base max-w-full md:max-w-[900px]"
                  >
                    {benefits}
                  </li>
                ))}
              </div>
              <hr className="mt-8 mb-8 border-gray-300" />
              <ApplyDialog jobId={id}>
                <LuSend className="text-xl" />
                Apply
              </ApplyDialog>
            </section>
          </React.Fragment>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default JobDetails;
