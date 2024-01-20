import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const locations = [
  { id: "intern", name: "Intern", value: "intern" },
  { id: "junior", name: "Junior", value: "junior" },
  { id: "lowExp", name: "1-2 years experience", value: "lowExp" },
  { id: "midExp", name: "2-5 years experience", value: "midExp" },
  { id: "highExp", name: "+5 years experience", value: "highExp" },
  { id: "teamLead", name: "Team Lead", value: "teamLead" },
];

const SeniorityList = () => {
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

export default SeniorityList;
