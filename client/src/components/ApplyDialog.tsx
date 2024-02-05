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

type ApplyDialogProps = {
  className?: string;
  children?: any;
};

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  uploadFile: z.string(),
});

const ApplyDialog = ({ className, children }: ApplyDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      uploadFile: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    setOpen(false);
    toast.success("Your CV has been sent successfully!");
    form.reset();
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
                <FormItem className="flex flex-col md:flex-row md:items-center md:gap-4">
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
                <FormItem className="flex flex-col md:flex-row md:items-center md:gap-4">
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
              name="uploadFile"
              render={({ field }) => (
                <FormItem className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <FormLabel>Attach CV</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="w-full sm:min-w-[350px] cursor-pointer text-slate-500"
                      {...field}
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
