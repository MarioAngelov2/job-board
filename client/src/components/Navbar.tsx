import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { title: "Post a job", href: "#" },
  { title: "Find a job", href: "#" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="sticky z-50 top-0 inset-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="flex pt-2 pb-2">
            <div className="flex lg:ml-0">
              <Link to="/" className="font-black text-3xl">
                dev.
                <span className="text-blue-600 lg:hover:text-gray-900 transition duration-300 ease-in-out">
                  jobs
                </span>
              </Link>
            </div>
            <div className="flex ml-auto items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {links.map((link) => (
                  <Button variant="ghost" key={link.title}>
                    <a href={link.href}>{link.title}</a>
                  </Button>
                ))}
                <SignedIn>
                  <Button variant="ghost">
                    <Link to="/dashboard/my-jobs">My Jobs</Link>
                  </Button>
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
            <div className="lg:hidden flex gap-4 items-center">
              <SignedOut>
                <Button variant="ghost" onClick={() => navigate("/sign-in")} className="p-0">
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
                <SheetContent>
                  <SheetHeader>
                    <SheetDescription>dasda</SheetDescription>
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
