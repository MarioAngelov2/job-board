import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="mb-32 flex flex-col items-center">
          <img
            src="/404.jpeg"
            alt="page not found"
            className="w-[700px] h-auto"
          />
          <h1 className="text-2xl md:text-4xl lg:text-5xl uppercase font-extrabold text-blue-400 text-center">
            Page was not found
          </h1>
          <Button onClick={() => navigate('/')} className="mt-6">Back to Home Page</Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default NotFound;
