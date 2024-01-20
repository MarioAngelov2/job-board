import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const locations = [
  { id: "any", name: "Any", value: "any" },
  { id: "sofia", name: "Sofia", value: "sofia" },
  { id: "plovdiv", name: "Plovdiv", value: "plovdiv" },
  { id: "varna", name: "Varna", value: "varna" },
  { id: "ruse", name: "Ruse", value: "ruse" },
  { id: "burgas", name: "Burgas", value: "burgas" },
];

const LocationMenu = () => {
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

export default LocationMenu;