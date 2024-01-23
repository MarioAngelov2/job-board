import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/filters/filterSlice";
import { RootState } from "@/redux/store";

const experience = [
  { id: "intern", name: "Intern", value: "intern" },
  { id: "junior", name: "Junior", value: "junior" },
  { id: "lowExp", name: "1-2 years experience", value: "lowExp" },
  { id: "midExp", name: "2-5 years experience", value: "midExp" },
  { id: "highExp", name: "+5 years experience", value: "highExp" },
  { id: "teamLead", name: "Team Lead", value: "teamLead" },
];

const SeniorityList = () => {
  const dispatch = useDispatch();
  const selectedSeiority = useSelector(
    (state: RootState) => state.locationReducer.seniority
  );

  const handleSeniorityChange = (value: string) => {
    dispatch(setFilter({ filterName: "seniority", value }));
  };

  return (
    <>
      <RadioGroup className="flex flex-col gap-2">
        {experience.map((exp) => (
          <div
            className="flex items-center space-x-2 text-slate-600 h-8 px-2 hover:bg-slate-100 rounded-md
            transition duration-300 ease-in-out"
            key={exp.id}
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
