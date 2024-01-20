import DatePostingList from "./DatePostingList";
import LocationMenu from "./LocationList";
import PriceList from "./PriceList";
import SeniorityList from "./SeniorityList";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";

const FilterMenu = () => {
  return (
    <div className="hidden mt-12 lg:flex lg:flex-col lg:bg-white w-1/3 xl:w-1/4 min-h-screen rounded-sm px-4 py-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-blue-600">
          <CiLocationOn className="text-2xl" />
          <h1 className="font-semibold">Location</h1>
        </div>
        <LocationMenu />
      </div>
      <hr className="mt-4" />
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex items-center gap-2 text-blue-600">
          <MdOutlineWorkOutline className="text-xl" />
          <h1 className="font-semibold">Seniority</h1>
        </div>
        <SeniorityList />
      </div>
      <hr className="mt-4" />
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex items-center gap-2 text-blue-600">
          <MdOutlineAttachMoney className="text-2xl" />
          <h1 className="font-semibold">Salary</h1>
        </div>
        <PriceList />
      </div>
      <hr className="mt-4" />
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex items-center gap-2 text-blue-600">
          <CiCalendarDate className="text-2xl" />
          <h1 className="font-semibold">Date of posting</h1>
        </div>
        <DatePostingList />
      </div>
    </div>
  );
};

export default FilterMenu;
