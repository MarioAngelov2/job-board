import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const EmptySavedJobs = () => {
  const navigate = useNavigate();

  return ( 
        <div className="flex flex-col items-center justify-center min-h-screen px-2 py-4 md:py-12 md:px-8">
          <h1 className="mb-1 text-xl font-black text-gray-600 uppercase md:text-2xl">
            No added jobs yet
          </h1>
          <p className="mb-4 text-gray-600">Save jobs to view them later</p>
          <Button onClick={() => navigate("/")}>Browse here</Button>
        </div>
  );
};

export default EmptySavedJobs;
