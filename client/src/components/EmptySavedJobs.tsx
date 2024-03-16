import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const EmptySavedJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen mt-48">
      <h1 className="text-3xl">No added jobs yet</h1>
      <p className="mt-1">Save jobs to view them later</p>
      <Button onClick={() => navigate('/')} className="mt-6">Browse here</Button>
    </div>
  );
};

export default EmptySavedJobs;
