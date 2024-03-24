import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const UpcomingPage = () => {
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="mb-1 text-xl font-black text-gray-600 uppercase md:text-5xl">Coming soon...</h1>
        <Button onClick={() => navigate('/')}>Back to Home page</Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default UpcomingPage;
