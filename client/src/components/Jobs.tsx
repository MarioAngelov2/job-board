import { useNavigate } from "react-router-dom";
import { CiLocationOn, CiClock2, CiCalendarDate } from "react-icons/ci";
import { PiMoneyLight } from "react-icons/pi";
import data from "../mock/data.json";
import { resetFilters } from "../redux/filters/filterSlice";
import { useDispatch } from "react-redux";

type Job = {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  logo: string;
  employmentType: string;
  salaryRange: string;
  datePosted: string;
};

interface JobsProps {
  searchValues: {
    search: string;
    location: string;
  };
}

const Jobs: React.FC<JobsProps> = ({ searchValues }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, location } = searchValues;

  const filteredJobs = data.filter((job: Job) => {
    const searchMatch =
      job.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const locationMatch = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return searchMatch && locationMatch;
  });

  return (
    <div className="mt-12 flex flex-col bg-white w-full min-h-screen rounded-sm px-4 py-4 gap-4">
      {filteredJobs.map((job) => (
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
                className=" object-contain max-h-[40px] md:max-h-[60px] w-[70px] md:w-[90px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs md:text-md text-gray-500">{job.company}</p>
            <p className="font-semibold text-md md:text-lg">{job.jobTitle}</p>
            <div className="flex flex-row gap-4">
              <div className="flex items-center gap-1 text-gray-500">
                <CiLocationOn className="text-sm lg:text-xl" />
                <p className="text-xs md:text-base">{job.location}</p>
              </div>
              <div className="hidden md:flex items-center gap-1 text-gray-500">
                <CiClock2 className="text-sm lg:text-lg" />
                <p className="text-sm md:text-base">{job.employmentType}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <PiMoneyLight className="text-sm lg:text-xl" />
                <p className="text-xs md:text-base">{job.salaryRange}</p>
              </div>
              <div className="hidden md:flex items-center gap-1 text-gray-500">
                <CiCalendarDate className="text-sm lg:text-xl" />
                <p className="text-sm md:text-base">{job.datePosted}</p>
              </div>
            </div>
            <div>
              <p className="text-sm md:text-base">Position details</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
