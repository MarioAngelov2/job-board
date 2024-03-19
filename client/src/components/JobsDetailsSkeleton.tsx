import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "./MaxWidthWrapper";

const JobDetailsSkeleton = () => {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen px-2">
        <section>
          <Skeleton className="flex flex-row gap-6 p-3.5 rounded-md bg-gradient-to-r from-white to-blue-100 py-6 mt-12 items-center">
            <div className="flex items-center">
              <Skeleton className="max-w-[200px] md:p-4 bg-gray-300">
                <Skeleton className="object-contain max-h-[40px] md:max-h-[60px] w-[90px] md:w-[200px] bg-gray-300" />
              </Skeleton>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-32 text-xs text-gray-500 md:text-md" />
              <Skeleton className="font-semibold text-md md:text-2xl md:w-[350px] w-64" />
              <Skeleton className="w-[230px] h-[45px] text-lg" />
            </div>
          </Skeleton>
        </section>
        <section>
          <Skeleton className="px-6 py-4 mt-6 bg-white rounded-md">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 text-sm text-slate-500" />
              <Skeleton className="w-64 text-xl font-semibold" />
              <div className="flex flex-wrap items-center gap-4 mt-1 md:flex-row">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="flex items-center gap-1 text-gray-500">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <div className="w-32 bg-gray-300"></div>
                  </Skeleton>
                ))}
              </div>
              <Skeleton className="flex flex-col gap-4 mt-4 md:flex-row">
                <Skeleton className="w-32 h-[45px]" />
                <Skeleton className="w-full h-[45px]" />
              </Skeleton>
            </div>
          </Skeleton>
        </section>
        {[...Array(4)].map((_, index) => (
          <section key={index} className="relative">
            <Skeleton className="flex flex-col mt-12">
              <div className="flex flex-col items-start">
                <Skeleton className="w-32 text-xl font-bold md:text-2xl" />
                <Skeleton className="mt-2 text-slate-500 leading-7 max-w-full md:max-w-[900px] h-12" />
              </div>
            </Skeleton>
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="mt-4 text-slate-500 leading-7 max-w-full md:max-w-[900px] h-8" />
            ))}
            <Skeleton className="mt-8 mb-8 w-32 h-[45px]" />
          </section>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default JobDetailsSkeleton;
