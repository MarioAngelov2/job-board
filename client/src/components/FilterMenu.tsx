import { useState } from "react";
import DatePostingList from "./DatePostingList";
import LocationMenu from "./LocationList";
import PriceList from "./PriceList";
import SeniorityList from "./SeniorityList";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { Button } from "./ui/button";
import { CiFilter } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const FilterMenu = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
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
      {/* MOBILE VERSION */}
      <div className="lg:hidden mt-4 md:mt-4 relative">
        <div className="flex mx-auto w-full justify-center">
          {/* FILTER MENU */}
          <Sheet>
            <SheetTrigger>
              <Button
                onClick={handleShowFilter}
                className="w-[300px] md:w-[600px] flex items-center gap-1"
              >
                <CiFilter className="text-xl" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription className="overflow-y-scroll max-h-screen">
                  <div className="flex flex-col gap-3 mt-4">
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
                  <div className="flex flex-col gap-3 mt-5 mb-14">
                    <div className="flex items-center gap-2 text-blue-600">
                      <CiCalendarDate className="text-2xl" />
                      <h1 className="font-semibold">Date of posting</h1>
                    </div>
                    <DatePostingList />
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default FilterMenu;
