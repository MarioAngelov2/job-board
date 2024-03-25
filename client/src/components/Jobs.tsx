import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn, CiClock2, CiCalendarDate } from "react-icons/ci";
import { BsSuitcaseLg } from "react-icons/bs";
import { PiMoneyLight } from "react-icons/pi";
import { resetFilters } from "../redux/filters/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { parseISO, differenceInDays } from "date-fns";
import JobsSkeleton from "./JobsSkeleton";
import PaginationComponent from "./Pagination";
import NoDataFound from "./NoDataFound";
import { fetchJobs, selectFetchJobs } from "../redux/jobs/jobSlice";
import { Job } from "../types/index";

interface JobsProps {
  searchValues: {
    search: string;
    location: string;
  };
}

const ITEMS_PER_PAGE = 7;

const Jobs: React.FC<JobsProps> = ({ searchValues }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector(selectFetchJobs);

  const { search, location } = searchValues;

  const selectedLocation = useSelector(
    (state: RootState) => state.filterReducer.location
  );
  const selectedSalary = useSelector(
    (state: RootState) => state.filterReducer.salary
  );
  const selectedSeniority = useSelector(
    (state: RootState) => state.filterReducer.seniority
  );
  const selectedDatePosted = useSelector(
    (state: RootState) => state.filterReducer.datePosted
  );

  useEffect(() => {
    setLoading(true);

    dispatch(fetchJobs()).then(() => {
      setLoading(false);
    });
  }, [selectedDatePosted, selectedLocation, selectedSalary, selectedSeniority]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedDatePosted,
    selectedLocation,
    selectedSalary,
    selectedSeniority,
    search,
    location,
  ]);

  let filteredJobs = jobs.filter((job: Job) => {
    const searchMatch =
      job.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase());

    const locationMatch = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return searchMatch && locationMatch;
  });

  if (selectedLocation && selectedLocation !== "any") {
    filteredJobs = filteredJobs.filter((job: Job) => {
      return job.location
        .toLowerCase()
        .includes(selectedLocation.toLowerCase());
    });
  }

  if (selectedSalary && selectedSalary !== "any") {
    filteredJobs = filteredJobs.filter((job: Job) => {
      return job.salaryType
        .toLowerCase()
        .includes(selectedSalary.toLowerCase());
    });
  }

  if (selectedSeniority && selectedSeniority !== "any") {
    filteredJobs = filteredJobs.filter((job: Job) => {
      return job.seniorityType
        .toLowerCase()
        .includes(selectedSeniority.toLowerCase());
    });
  }

  if (selectedDatePosted && selectedDatePosted !== "allTime") {
    filteredJobs = filteredJobs.filter((job: any) => {
      let postedDate = parseISO(job.datePosted);
      let differenceInDaysResult = differenceInDays(new Date(), postedDate);

      if (selectedDatePosted === "last24h") {
        return differenceInDaysResult <= 1;
      } else if (selectedDatePosted === "last7d") {
        return differenceInDaysResult <= 7;
      } else if (selectedDatePosted === "last30d") {
        return differenceInDaysResult >= 30;
      } else {
        return job;
      }
    });
  }
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const jobsToShow = filteredJobs.slice(startIndex, endIndex);

  if (loading) {
    return <JobsSkeleton />;
  }

  if (filteredJobs.length === 0 && !loading) {
    return <NoDataFound />;
  }

  return (
    <div className="flex flex-col w-full min-h-screen gap-4 px-0 py-4 mt-12 bg-white rounded-sm md:px-4">
      {jobsToShow.map((job: Job) => (
        <div
          key={job.id}
          onClick={() => {
            navigate(`/job/${job.id}`);
            dispatch(resetFilters());
          }}
          className="flex flex-row gap-6 p-3.5 rounded-md bg-gradient-to-r from-white to-blue-100 cursor-pointer
         hover:shadow-lg transition duration-300 ease-in-out py-6"
        >
          <div className="flex items-center">
            <div className="max-w-[200px] md:p-4">
              <img
                src={job.logo}
                alt="company logo"
                className="object-contain max-h-[40px] md:max-h-[60px] w-[70px] md:w-[90px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-500 md:text-md">{job.company}</p>
            <p className="font-semibold text-md md:text-lg">{job.jobTitle}</p>
            <div className="flex flex-row gap-4">
              <div className="flex items-center gap-1 text-gray-500">
                <CiLocationOn className="text-xl lg:text-xl" />
                <p className="text-md md:text-base">{job.location}</p>
              </div>
              <div className="items-center hidden gap-1 text-gray-500 md:flex">
                <CiClock2 className="text-sm lg:text-lg" />
                <p className="text-sm md:text-base">{job.employmentType}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <PiMoneyLight className="text-xl lg:text-xl" />
                <p className="text-md md:text-base">{job.salaryRange} BGN</p>
              </div>
              <div className="items-center hidden gap-1 text-gray-500 md:flex">
                <CiCalendarDate className="text-sm lg:text-xl" />
                <p className="text-sm md:text-base">
                  {new Date(job.datePosted).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 md:text-base">
              <BsSuitcaseLg className="text-lg" />
              <p className="text-[16px] lg:text-[15px]">{job.seniorityType}</p>
            </div>
          </div>
        </div>
      ))}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default Jobs;
