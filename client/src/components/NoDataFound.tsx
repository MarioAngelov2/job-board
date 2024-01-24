import MaxWidthWrapper from "./MaxWidthWrapper";

const NoDataFound = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center mt-12 lg:mt-32">
        <img
          src="/no-data-found.png"
          alt="no data found"
          className="w-[350px] md:w-[550px] h-auto"
        />
        <p className="text-xl md:text-2xl mb-1 text-gray-500">No data found</p>
        <p className="text-lg md:text-2xl mb-12 text-gray-500">Refresh the page or try again later</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default NoDataFound;
