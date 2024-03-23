const seniorityOptions = [
  { value: "intern", label: "Intern" },
  { value: "junior", label: "1-2 years experience" },
  { value: "mid", label: "2-5 years experience" },
  { value: "senior", label: "+5 years experience" },
  { value: "teamLead", label: "Team Lead" },
];

let URL: string;

if (import.meta.env.VITE_NODE_ENV === "development") {
  URL = import.meta.env.VITE_DEVELOPMENT_ORIGIN 
} else if (import.meta.env.VITE_NODE_ENV === "production") {
  URL = import.meta.env.VITE_PRODUCTION_ORIGIN;
}

export { URL, seniorityOptions };