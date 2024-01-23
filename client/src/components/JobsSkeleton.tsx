import { Skeleton } from "@/components/ui/skeleton";

const numberOfSkeletons = 7;

const JobsSkeleton = () => {
  return (
    <Skeleton className="mt-12 flex flex-col w-full min-h-screen rounded-sm px-4 py-4 gap-4 bg-white">
      {Array.from({ length: numberOfSkeletons }, (_, index) => (
        <Skeleton
          key={index}
          className="flex flex-row gap-6 p-3.5 rounded-md py-6 bg-gray-100 "
        >
          <Skeleton className="flex">
            <Skeleton className="max-w-[200px] md:p-4 bg-gray-300">
              <Skeleton className="object-contain max-h-[40px] h-14 md:max-h-[60px] w-[70px] md:w-[90px] bg-gray-300" />
            </Skeleton>
          </Skeleton>
          <Skeleton className="flex flex-col items-center justify-center lg:items-start gap-2 bg-none w-full">
            <Skeleton className="w-full lg:w-[450px] h-6 bg-gray-300" />
            <Skeleton className="w-full lg:w-[350px] h-6 bg-gray-300" />
          </Skeleton>
        </Skeleton>
      ))}
    </Skeleton>
  );
};

export default JobsSkeleton;
