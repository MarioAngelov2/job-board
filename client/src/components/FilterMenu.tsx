import DatePostingList from "./DatePostingList";
import LocationMenu from "./LocationList";
import PriceList from "./PriceList";
import SeniorityList from "./SeniorityList";

const FilterMenu = () => {
  return (
    <div className="hidden mt-12 lg:flex lg:flex-col lg:bg-white w-1/3 xl:w-1/4 min-h-screen rounded-sm px-4 py-4">
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold">Location</h1>
        <LocationMenu />
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <h1 className="font-semibold">Seniority</h1>
        <SeniorityList />
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <h1 className="font-semibold">Salary</h1>
        <PriceList />
      </div>
      <div className="flex flex-col gap-3 mt-7">
        <h1 className="font-semibold">Date of posting</h1>
        <DatePostingList />
      </div>
    </div>
  );
};

export default FilterMenu;
