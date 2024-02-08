import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FcDocument, FcFolder, FcBookmark, FcPlus } from "react-icons/fc";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const privateLinks = [
  { title: "Create Job", href: "/dashboard/create-job" },
  { title: "Jobs Applied", href: "/dashboard/my-jobs" },
  { title: "Saved Jobs", href: "/dashboard/saved-jobs" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="sticky inset-0 top-0 z-50 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="flex pt-2 pb-2">
            <div className="flex lg:ml-0">
              <Link to="/" className="text-3xl font-black">
                dev.
                <span className="text-blue-600 transition duration-300 ease-in-out lg:hover:text-gray-900">
                  jobs
                </span>
              </Link>
            </div>
            <div className="flex items-center ml-auto">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <SignedIn>
                  {privateLinks.map((link) => (
                    <Button key={link.title} variant="ghost">
                      <Link to={link.href}>{link.title}</Link>
                    </Button>
                  ))}
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Button variant="ghost" onClick={() => navigate("/sign-in")}>
                    Sign In
                  </Button>
                </SignedOut>
              </div>
            </div>
            {/*MOBILE NAV */}
            <div className="flex items-center gap-4 lg:hidden">
              <SignedOut>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/sign-in")}
                  className="p-0 hover:bg-transparent"
                >
                  Sign In
                </Button>
              </SignedOut>
              <UserButton afterSignOutUrl="/sign-in" />
              <Sheet>
                <SheetTrigger>
                  <RxHamburgerMenu
                    onClick={handleMobileMenu}
                    className="text-3xl"
                  />
                </SheetTrigger>
                <SheetContent className="px-0 py-10">
                  <SheetHeader>
                    <SheetDescription className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-lg"
                      >
                        <Link
                          to="/dashboard/my-jobs"
                          className="flex items-center gap-2"
                        >
                          <FcDocument className="text-2xl" />
                          Jobs Applied
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-lg"
                      >
                        <Link
                          to="/dashboard/my-jobs"
                          className="flex items-center gap-2"
                        >
                          <FcBookmark className="text-2xl" />
                          Saved Jobs
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start w-full text-lg"
                      >
                        <Link
                          to="/dashboard/create-job"
                          className="flex items-center gap-2"
                        >
                          <FcPlus className="text-2xl" />
                          Create Job
                        </Link>
                      </Button>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
