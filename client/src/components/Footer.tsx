import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";

const applyLinks = [
  { title: "Jobs Applied", link: "/dashboard/applied-jobs" },
  { title: "Saved Jobs", link: "/dashboard/saved-jobs" },
  { title: "Newsletter", link: "/upcoming" },
];

const companyLinks = [
  { title: "About", link: "/upcoming" },
  { title: "Terms & Conditions", link: "/upcoming" },
  { title: "Privacy Policy", link: "/upcoming" },
];

const findUsLinks = [
  { title: "LinkedIn", link: "https://www.linkedin.com" },
  { title: "Instagram", link: "https://www.instagram.com" },
  { title: "Facebook", link: "https://www.facebook.com" },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 min-h-48">
      <MaxWidthWrapper>
        <div className="grid items-center grid-cols-1 gap-4 px-6 py-10 mt-4 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link to="/" className="text-2xl font-black">
              dev.
              <span className="text-blue-600 transition duration-300 ease-in-out hover:text-gray-900">
                jobs
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 md:text-base">
              Find a job in one of the best tech companies in Bulgaria
            </p>
          </div>
          <ul className="flex flex-col justify-self-start lg:justify-self-center">
            <h1 className="mb-2 font-semibold uppercase">Apply</h1>
            {applyLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.link}
                  className="text-sm text-gray-500 transition duration-300 ease-in-out hover:text-gray-900 md:text-base"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col justify-self-start lg:justify-self-center">
            <h1 className="mb-2 font-semibold uppercase">Company</h1>
            {companyLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.link}
                  className="text-sm text-gray-500 transition duration-300 ease-in-out hover:text-gray-900 md:text-base"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col justify-self-start lg:justify-self-center">
            <h1 className="mb-2 font-semibold uppercase">Find Us</h1>
            {findUsLinks.map((link) => (
              <li key={link.title}>
                <a
                  target="_blank"
                  href={link.link}
                  className="text-sm text-gray-500 transition duration-300 ease-in-out hover:text-gray-900 md:text-base"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
