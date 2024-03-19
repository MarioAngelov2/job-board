import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { uploadFile, selectFile } from "../redux/jobs/fileSlice";
import { applyJob } from "../redux/jobs/applicationSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";

type ApplyDialogProps = {
  className?: string;
  children?: any;
  jobId: string | undefined;
};

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  file: z.object({ file: z.any() }),
});

const ApplyDialog = ({ className, children, jobId }: ApplyDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      file: undefined,
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const userCV = useSelector(selectFile);
  const { userId } = useAuth();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!jobId) return;

    if (typeof userCV === "string" || !userCV) return

    setOpen(false);
    toast.success("Your CV has been sent successfully!");
    form.reset();
    const formData = {
      ...values,
      jobId,
      userId,
      userCV,
    };
    dispatch(applyJob(formData));
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFile(formData));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "flex items-center w-full md:w-[300px] mb-12 mt-8 gap-2",
            className
          )}
          variant="default"
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-12">
        <DialogHeader>
          <DialogTitle>Send your CV</DialogTitle>
          <DialogDescription>
            Fill the required fields and send your CV to the company.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 md:gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3 md:flex-col md:items-start">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3 transition duration-300 ease-in-out text-slate-500"
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-3 md:flex-col md:items-start">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3 transition duration-300 ease-in-out text-slate-500"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem className="flex flex-col mt-3 md:flex-col md:items-start">
                  <FormLabel>Attach CV</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="w-full sm:min-w-[350px] cursor-pointer text-slate-500"
                      {...form.register("file", {
                        onChange: (e) => handleUploadFile(e),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex md:justify-end">
              <Button className="w-full md:w-[40%] mt-4" type="submit">
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
