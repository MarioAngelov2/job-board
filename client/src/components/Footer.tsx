import { Link } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";

const applyLinks = [
  { title: "Jobs", link: "/jobs" },
  { title: "Companies", link: "/companies" },
  { title: "Newsletter", link: "/newsletter" },
];

const companyLinks = [
  { title: "About", link: "/about" },
  { title: "Terms & Conditions", link: "/terms-conditions" },
  { title: "Privacy Policy", link: "/privacy-policy" },
];

const findUsLinks = [
  { title: "LinkedIn", link: "/twitter" },
  { title: "Instagram", link: "/instagram" },
  { title: "Facebook", link: "/facebook" },
];

const Footer = () => {
  return (
    <div className="bg-gray-100 min-h-48">
      <MaxWidthWrapper>
        <div className="py-10 px-6 mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4 items-center">
          <div className="flex flex-col">
            <Link to="/" className="font-black text-2xl">
              dev.
              <span className="text-blue-600 hover:text-gray-900 transition duration-300 ease-in-out">
                jobs
              </span>
            </Link>
            <p className="mt-4">Find a job in one of the best tech companies in Bulgaria</p>
          </div>
          <ul className="flex flex-col justify-self-start lg:justify-self-center">
            <h1 className="font-semibold uppercase mb-2">Apply</h1>
            {applyLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.link}
                  className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col justify-self-start lg:justify-self-center">
            <h1 className="font-semibold uppercase mb-2">Company</h1>
            {companyLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.link}
                  className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col justify-self-start lg:justify-self-center">
            <h1 className="font-semibold uppercase mb-2">Find Us</h1>
            {findUsLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.link}
                  className="text-gray-500 hover:text-gray-900 transition duration-300 ease-in-out"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
