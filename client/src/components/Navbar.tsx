import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

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
          <div className="flex border-b border-gray-200 pt-2 pb-2">
            <div className="flex lg:ml-0">
              <Link to="/" className="font-black text-2xl">
                dev.
                <span className="text-blue-600 hover:text-gray-900 transition duration-300 ease-in-out">
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
                  <UserButton afterSignOutUrl="/sign-in" />
                </SignedIn>
                <SignedOut>
                  <Button variant="ghost" onClick={() => navigate("/sign-in")}>
                    Sign In
                  </Button>
                </SignedOut>
              </div>
            </div>
            {/* TODO MOBILE NAV */}
            <div className="lg:hidden flex gap-6 items-center">
              <SignedIn>
                <UserButton afterSignOutUrl="/sign-in" />
                {open ? (
                  <IoCloseOutline
                    className="text-4xl z-20"
                    onClick={handleMobileMenu}
                  />
                ) : (
                  <RxHamburgerMenu
                    className="text-3xl z-10"
                    onClick={handleMobileMenu}
                  />
                )}
                {open && (
                  <div className="absolute top-0 right-0 w-screen h-screen bg-gray-50">
                    <div className="flex justify-start mt-4 ml-2">
                      MOBILE MENU
                    </div>
                  </div>
                )}
              </SignedIn>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
