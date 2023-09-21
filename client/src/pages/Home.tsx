import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tabs from "../components/Common/Tabs";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("search"); // Default active tab is "search"

  return (
    <div>
      <div className="container mx-auto mt-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Email Analyzer</h1>
        <p className="text-lg mb-8">
          Analyze and report suspicious emails with ease.
        </p>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            {
              label: "Search",
              value: "search",
            },
            {
              label: "Upload",
              value: "upload",
            },
          ]}
        />
        {activeTab === "search" ? (
          <div>
            <div className="text-sm mb-4 flex flex-row justify-center items-center w-full">
              <p className="w-5/12">
                Search for a hash, IP address, email, or gain additional context
                and threat landscape visibility with{" "}
                <Link
                  to="/"
                  className="dark:text-blue-600 text-blue-400 hover:text-blue-500"
                >
                  Threat Intelligence
                </Link>
              </p>
            </div>
            <div className="relative w-6/12 mx-auto">
              <input
                type="text"
                placeholder="Search for a report"
                className="bg-transparent placeholder:dark:text-gray-500 border border-blue-dark-100 focus:outline-none focus:ring-0 focus:border-blue-500 rounded-sm p-2 w-full"
              />
              <button className="search-button absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-xl" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative w-6/12 mx-auto">
              <textarea
                placeholder="Paste the email source here"
                className="bg-transparent placeholder:dark:text-gray-500 border border-blue-dark-100 focus:outline-none focus:ring-0 focus:border-blue-500 rounded-sm p-2 w-full"
                rows={8}
              />
            </div>
          </div>
        )}
        <div className="text-center w-full flex flex-col justify-center items-center break-words text-[14px]">
          <p className="mt-4 w-6/12">
            By submitting data above, you are agreeing to our{" "}
            <Link to="#" className="dark:text-blue-600 text-blue-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="dark:text-blue-600 text-blue-400">
              Privacy Policy
            </Link>
            , and to the{" "}
            <span className="font-semibold">
              sharing of your information with the security community.
            </span>{" "}
            Please do not submit any sensitive information.
          </p>
          <p className="w-6/12 mt-2">
            Threat Operative is not responsible for any damages caused by the
            use of this service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
