import React from "react";
import {
  FaArrowDown,
  FaExclamationTriangle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { YaraResults } from "../../pages/Report";

interface YaraListProps {
  yaraDetections: YaraResults[];
}

const YaraList: React.FC<YaraListProps> = ({ yaraDetections }) => {
  if (!yaraDetections) return null;

  return (
    <section className="mt-8 container w-10/12">
      <h1 className="text-xl font-semibold pb-1 pt-1 border-t border-b border-t-blue-dark-300 border-b-blue-dark-300">
        YARA Rules
      </h1>
      <div className="flex flex-col space-y-2 mt-2">
        {yaraDetections.map((detection) => {
          return (
            <div
              key={detection.rule}
              className="border border-blue-dark-300 p-4 rounded-lg flex items-start"
            >
              <div className="mr-4">
                <FaExclamationTriangle className="text-yellow-300 w-8 h-8" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm">
                  Detected by YARA rule{" "}
                  <span className="text-yellow-300">{detection.rule_name}</span>{" "}
                  by <span className="text-yellow-300">{detection.author}</span>{" "}
                  from ruleset{" "}
                  <span className="text-yellow-300">{detection.rule_name}</span>{" "}
                  at{" "}
                  <a
                    href={detection.source}
                    className="text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {detection.source}
                    <FaExternalLinkAlt className="inline ml-1 text-blue-400 w-4 h-4" />
                  </a>
                </p>
                <div className="flex items-center text-blue-400 text-sm mt-2">
                  <FaArrowDown className="w-4 h-4 mr-1" />
                  <span>{detection.description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default YaraList;
