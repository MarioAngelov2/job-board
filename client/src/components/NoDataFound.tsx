import MaxWidthWrapper from "./MaxWidthWrapper";

const NoDataFound = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center mt-12 lg:mt-32">
        <img
          src="/no-data-found.png"
          alt="no data found"
          className="w-[250px] md:w-[400px] h-auto"
        />
        <p className="mb-1 text-xl text-gray-500 md:text-2xl">No data found</p>
        <p className="mb-12 text-lg text-gray-500 md:text-2xl">Refresh the page or try again later</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default NoDataFound;
