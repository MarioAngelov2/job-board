import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filters/filterSlice";
import { RootState } from "@/redux/store";

const datePosted = [
  { id: "allTime", name: "All time", value: "allTime" },
  { id: "last24hours", name: "Last 24 hours", value: "last24hours" },
  { id: "last7days", name: "Last 7 days", value: "last7days" },
  { id: "lastMonth", name: "Last Mont", value: "lastMonth" },
];

const DatePostingList = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.filterReducer.datePosted
  );

  const handleDateChange = (value: string) => {
    dispatch(setFilter({ filterName: "datePosted", value }));
  };

  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {datePosted.map((date) => (
          <div
            className="flex items-center space-x-2 text-slate-600 h-8 px-2 hover:bg-slate-100 rounded-md
            transition duration-300 ease-in-out"
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
