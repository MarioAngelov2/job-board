import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FilterMenu from "@/components/FilterMenu";
import Jobs from "@/components/Jobs";

const formSchema: z.ZodSchema<{ search: string; location: string }> = z.object({
  search: z.string(),
  location: z.string(),
});

const Home = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-12 md:mt-24 relative">
        <h1 className="text-3xl text-center font-semibold md:text-4xl lg:text-start lg:text-5xl">
          Find your <span className="text-blue-600">new job</span> today
        </h1>
        <p className="mt-3 text-slate-500 text-sm text-center lg:text-start md:text-base">
          Thousands of jobs in the computer, engineering and technology sectors
          are waiting for you.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex flex-col lg:flex-row items-center gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[300px] md:w-[600px] lg:w-[550px] transition duration-300 ease-in-out"
                      placeholder="What position you are looking for?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[300px] md:w-[600px] lg:w-[300px] transition duration-300 ease-in-out"
                      placeholder="Location?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-[300px] md:w-[600px]" type="submit">
              Search
            </Button>
          </form>
        </Form>
      </div>
      {/* FILTER MENU */}
      <div className="lg:flex lg:flex-row lg:gap-6">
        <FilterMenu />
        <Jobs searchValues={form.getValues()} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
