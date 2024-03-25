import ApplyDialog from "./ApplyDialog";
import { LuSend } from "react-icons/lu";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ApplyButtonProps {
  userId: string | undefined | null;
  jobId: string;
}

const ApplyButton = ({ userId, jobId }: ApplyButtonProps) => {
  if (userId) {
    return (
      <ApplyDialog
        jobId={jobId}
        className="gap-2 w-[100%] md:w-[300px] h-[40px] lg:w-[230px] lg:h-[45px] lg:text-lg margin-0"
      >
        <LuSend className="text-2xl" />
        Apply
      </ApplyDialog>
    );
  } else {
    return (
      <Button
        onClick={() => toast.error("Please login to apply")}
        className="gap-2 w-[100%] md:w-[300px] h-[40px] lg:w-[230px] lg:h-[45px] lg:text-lg margin-0"
      >
        <LuSend className="text-2xl" />
        Apply
      </Button>
    );
  }
};

export default ApplyButton;
