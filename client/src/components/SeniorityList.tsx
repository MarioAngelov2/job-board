import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filters/filterSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const experience = [
  { id: "any", name: "Any", value: "any" },
  { id: "intern", name: "Intern", value: "Intern" },
  { id: "junior", name: "1-2 years experience", value: "Junior" },
  { id: "mid", name: "2-5 years experience", value: "Mid" },
  { id: "senior", name: "+5 years experience", value: "Senior" },
  { id: "teamLead", name: "Team Lead", value: "Team Lead" },
];

const SeniorityList = () => {
  const dispatch = useDispatch();
  const selectedSeiority = useSelector(
    (state: RootState) => state.filterReducer.seniority
  );

  useEffect(() => {
    dispatch(setFilter({ filterName: "seniority", value: "any" }));
  }, []);

  const handleSeniorityChange = (value: string) => {
    dispatch(setFilter({ filterName: "seniority", value }));
  };

  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center h-8 px-2 space-x-2 transition duration-300 ease-in-out rounded-md text-slate-600 hover:bg-slate-100"
          >
            <RadioGroupItem
              value={exp.value}
              id={exp.id}
              checked={selectedSeiority === exp.value}
              onClick={() => handleSeniorityChange(exp.value)}
            />
            <Label htmlFor={exp.value} className="cursor-pointer">
              {exp.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export default SeniorityList;
