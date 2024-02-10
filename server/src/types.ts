export type Job = {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  salaryType: string;
  seniorityLevel: string;
  seniorityType: string;
  aboutUs: string;
  tasks: string;
  requirements: string[];
  benefits: string[];
  finalWords: string;
  companyLogo: { imageUrl: string; imageId: string };
};
