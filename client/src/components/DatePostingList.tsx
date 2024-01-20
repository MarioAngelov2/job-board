import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const locations = [
  { id: "allTime", name: "All time", value: "allTime" },
  { id: "last24hours", name: "Last 24 hours", value: "last24hours" },
  { id: "last7days", name: "Last 7 days", value: "last7days" },
  { id: "lastMonth", name: "Last Mont", value: "lastMonth" },
];

const DatePostingList = () => {
  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {locations.map((location) => (
          <div
            className="flex items-center space-x-2 text-slate-600 h-8 px-2 hover:bg-slate-100 rounded-md
            transition duration-300 ease-in-out"
            key={location.id}
          >
            <RadioGroupItem value={location.value} id={location.id} />
            <Label htmlFor={location.value} className="cursor-pointer">
              {location.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export default DatePostingList;
