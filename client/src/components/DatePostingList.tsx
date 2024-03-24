import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filters/filterSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const datePosted = [
  { id: "allTime", name: "All time", value: "allTime" },
  { id: "last24h", name: "Last 24 hours", value: "last24h" },
  { id: "last7d", name: "Last 7 days", value: "last7d" },
  { id: "last30d", name: "Last Month", value: "last30d" },
];

const DatePostingList = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.filterReducer.datePosted
  );

  useEffect(() => {
    dispatch(setFilter({ filterName: "datePosted", value: "allTime" }));
  }, []);

  const handleDateChange = (value: string) => {
    dispatch(setFilter({ filterName: "datePosted", value }));
  };

  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {datePosted.map((date) => (
          <div
            className="flex items-center h-8 px-2 space-x-2 transition duration-300 ease-in-out rounded-md text-slate-600 hover:bg-slate-100"
            key={date.id}
          >
            <RadioGroupItem
              value={date.value}
              id={date.id}
              checked={selectedDate === date.value}
              onClick={() => handleDateChange(date.value)}
            />
            <Label htmlFor={date.value} className="cursor-pointer">
              {date.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export default DatePostingList;
