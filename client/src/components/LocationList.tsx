import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filters/filterSlice";
import { useEffect } from "react";

const locations = [
  { id: "any", name: "Any", value: "any" },
  { id: "sofia", name: "Sofia", value: "sofia" },
  { id: "plovdiv", name: "Plovdiv", value: "plovdiv" },
  { id: "varna", name: "Varna", value: "varna" },
  { id: "ruse", name: "Ruse", value: "ruse" },
  { id: "burgas", name: "Burgas", value: "burgas" },
];

const LocationMenu = () => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state: RootState) => state.filterReducer.location
  );

  useEffect(() => {
    dispatch(setFilter({ filterName: "location", value: "any" }));
  }, [])

  const handleLocationChange = (value: string) => {
    dispatch(setFilter({ filterName: "location", value }));
  };

  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {locations.map((location) => (
          <div
            className="flex items-center h-8 px-2 space-x-2 transition duration-300 ease-in-out rounded-md text-slate-600 hover:bg-slate-100"
            key={location.id}
          >
            <RadioGroupItem
              value={location.value}
              id={location.id}
              checked={selectedLocation === location.value}
              onClick={() => handleLocationChange(location.value)}
            />
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
