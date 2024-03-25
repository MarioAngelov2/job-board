import { CiHeart } from "react-icons/ci";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface SaveButtonProps {
  userId: string | undefined | null;
  jobId: string;
}

const SaveButton = ({ userId, jobId }: SaveButtonProps) => {
  if (userId) {
    return (
      <Button className="gap-2 lg:w-[230px] lg:h-[45px] lg:text-lg">
        <CiHeart className="text-2xl" />
        Save
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => toast.error("Please login to save job")}
        className="gap-2 lg:w-[230px] lg:h-[45px] lg:text-lg"
      >
        <CiHeart className="text-2xl" />
        Save
      </Button>
    );
  }
};

export default SaveButton;
