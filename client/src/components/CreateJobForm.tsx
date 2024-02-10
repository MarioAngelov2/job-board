import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { seniorityOptions } from "../constants/index";
import { useState } from "react";
import { PiDotOutlineFill } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/jobs/jobSlice";
import { uploadImage, selectImage } from "../redux/jobs/imageSlice";
import { AppDispatch } from "@/redux/store";

const formSchema = z.object({
  company: z.string(),
  jobTitle: z.string(),
  location: z.string(),
  employmentType: z.string(),
  salaryRange: z.string(),
  seniorityLevel: z.string(),
  tasks: z.string(),
  finalWords: z.string(),
  aboutUs: z.string(),
  newBenefits: z.string(),
  newRequirement: z.string(),
  companyLogo: z.object({ file: z.any() }),
});
const CreateJobForm = () => {
  const [requirementsList, setRequirementsList] = useState<string[]>([]);
  const [benefitsList, setBenefitsList] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      jobTitle: "",
      location: "",
      employmentType: "",
      salaryRange: "",
      seniorityLevel: "",
      tasks: "",
      finalWords: "",
      aboutUs: "",
      newBenefits: "",
      newRequirement: "",
      companyLogo: undefined,
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const image = useSelector(selectImage)

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      dispatch(uploadImage(formData));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      requirements: requirementsList,
      benefits: benefitsList,
      companyLogo: image,
    };
    console.log(formData);

    dispatch(addJob(formData));
    setRequirementsList([]);
    setBenefitsList([]);
    form.reset();
  };

  const handleAddRequirement = () => {
    if (form.getValues("newRequirement") === "") return;

    const newRequirement = form.getValues("newRequirement");
    setRequirementsList((prevRequirements) => [
      ...prevRequirements,
      newRequirement,
    ]);
    form.setValue("newRequirement", "");
  };

  const handleDeleteRequirement = (index: number) => {
    setRequirementsList((prevRequirements) =>
      prevRequirements.filter((_, i) => i !== index)
    );
  };

  const handleAddBenefits = () => {
    if (form.getValues("newBenefits") === "") return;

    const benefits = form.getValues("newBenefits");
    setBenefitsList((prevBenefits) => [...prevBenefits, benefits]);
    form.setValue("newBenefits", "");
  };

  const handleDeleteBenefits = (index: number) => {
    setBenefitsList((prevBenefits) =>
      prevBenefits.filter((_, i) => i !== index)
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="transition duration-300 ease-in-out cursor-pointer text-slate-500"
                      {...form.register("companyLogo", {
                        onChange: (e) => handleUploadImage(e)
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* FROM SECOND ROW */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* SECOND ROW */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* THIRD ROW */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="seniorityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seniority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("seniorityLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select seniority">
                          {seniorityOptions.find(
                            (option) => option.value === field.value
                          )?.label || "Select seniority"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {seniorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 mt-2 md:mt-0">
            <FormField
              control={form.control}
              name="salaryRange"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* FOURTH ROW */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="aboutUs"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>About The Company</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-32 transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* FIFTH ROW */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="tasks"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Specific Tasks</FormLabel>
                  <FormControl>
                    <Textarea
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* SIXTH ROW */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="newRequirement"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-end md:w-[20%]">
            <Button
              type="button"
              onClick={handleAddRequirement}
              className="w-full"
            >
              Add
            </Button>
          </div>
        </div>
        {/* LIST REQUIREMENTS */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <ul className="flex flex-col gap-1.5">
              {requirementsList.map((requirement, index) => (
                <div
                  key={index}
                  className="grid items-center grid-cols-2 p-1 bg-gray-100 rounded-md"
                >
                  <li className="flex items-center gap-1 py-1 rounded-md">
                    <PiDotOutlineFill size={30} />
                    {requirement}
                  </li>
                  <div className="flex justify-end pr-4">
                    <MdDeleteOutline
                      onClick={() => handleDeleteRequirement(index)}
                      className="w-8 h-6 text-gray-500 transition duration-300 ease-in-out cursor-pointer hover:text-gray-900"
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        {/* BENEFITS */}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="newBenefits"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <Input
                      className="transition duration-300 ease-in-out text-slate-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-end md:w-[20%]">
            <Button
              type="button"
              onClick={handleAddBenefits}
              className="w-full"
            >
              Add
            </Button>
          </div>
        </div>
        {/* BENEFITS LIST*/}
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <div className="flex-1">
            <ul className="flex flex-col gap-1.5">
              {benefitsList.map((benefit, index) => (
                <div
                  key={index}
                  className="grid items-center grid-cols-2 p-1 bg-gray-100 rounded-md"
                >
                  <li className="flex items-center gap-1 py-1 rounded-md">
                    <PiDotOutlineFill size={30} />
                    {benefit}
                  </li>
                  <div className="flex justify-end pr-4">
                    <MdDeleteOutline
                      onClick={() => handleDeleteBenefits(index)}
                      className="w-8 h-6 text-gray-500 transition duration-300 ease-in-out cursor-pointer hover:text-gray-900"
                    />
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="mt-8 w-full md:w-[40%]" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
