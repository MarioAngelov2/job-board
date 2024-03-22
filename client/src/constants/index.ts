export const seniorityOptions = [
  { value: "intern", label: "Intern" },
  { value: "junior", label: "1-2 years experience" },
  { value: "mid", label: "2-5 years experience" },
  { value: "senior", label: "+5 years experience" },
  { value: "teamLead", label: "Team Lead" },
];

export const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : "https://job-board-api-l7c8.onrender.com";