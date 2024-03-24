import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filters/filterSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const salary = [
  { id: "any", name: "Any", value: "any" },
  { id: "lowRange", name: "1000-2000 BGN", value: "lowRange" },
  { id: "midRange", name: "2000-3500 BGN", value: "midRange" },
  { id: "highRange", name: "+3500 BGN", value: "highRange" },
];

const PriceList = () => {
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state: RootState) => state.filterReducer.salary
  );

  useEffect(() => {
    dispatch(setFilter({ filterName: "salary", value: "any" }));
  }, [])

  const handleSalaryChange = (value: string) => {
    dispatch(setFilter({ filterName: "salary", value }));
  };

  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {salary.map((salary) => (
          <div
            className="flex items-center h-8 px-2 space-x-2 transition duration-300 ease-in-out rounded-md text-slate-600 hover:bg-slate-100"
            key={salary.id}
          >
            <RadioGroupItem
              value={salary.value}
              id={salary.id}
              checked={selectedLocation === salary.value}
              onClick={() => handleSalaryChange(salary.value)}
            />
            <Label htmlFor={salary.value} className="cursor-pointer">
              {salary.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export default PriceList;
