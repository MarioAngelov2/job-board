export type Job = {
  jobTitle: string;
  employmentType: string;
  salaryRange: string;
  salaryType: string;
  seniorityLevel: string;
  seniorityType: string;
  aboutUs: string;
  datePosted: string;
  finalWords: string;
  id: string;
  company: string;
  location: string;
  tasks: string;
  requirements: string[];
  benefits: string[];
  logo: string;
};

export type FetchedJob = {
  jobTitle: string;
  employmentType: string;
  salaryRange: string;
  salaryType: string;
  seniorityLevel: string;
  seniorityType: string;
  aboutUs: string;
  datePosted: string;
  finalWords: string;
  id: string;
  company: string;
  location: string;
  tasks: string;
  requirements: string[];
  benefits: string[];
  logo: string;
  userId: string;
  jobId: string;
};

export type SavedJob = {
jobId: string;
jobTitle: string;
employmentType: string;
salaryRange: string;
salaryType: string;
seniorityLevel: string;
seniorityType: string;
aboutUs: string;
datePosted: string;
dateSaved: string;
company: string;
location: string;
tasks: string;
requirements: string[];
benefits: string[];
}