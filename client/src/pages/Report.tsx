import { useState, useEffect } from "react";

import { FaBug, FaInfoCircle } from "react-icons/fa";
import Tabs from "../components/Common/Tabs";
import YaraList from "../components/ReportComponents/YaraList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setReport } from "../store/report/actions";

const Report = () => {
  const report = useSelector((state: RootState) => state.report.report);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("detection");
  /*const reports: IReport[] = [
    {
      hash: "24d004a104d4d54034dbcffc2a4b19a11f39008a575aa614ea04703480b1022c",
      ip: "127.0.0.1",
      tags: ["malware", "cve-2017-0147"],
      detections: 1,
      firstReport: new Date(
        "Sep 21 2023 22:12:05 GMT+0200 (Central European Summer Time)"
      ).toLocaleDateString(),
      lastReport: new Date().toLocaleDateString(),
      submitters: ["submitter1", "submitter2"],
      icon: "icon",
      id: "1",
    },
  ];*/

  useEffect(() => {
    const reportTemplate: IReport = {
      hash: "24d004a104d4d54034dbcffc2a4b19a11f39008a575aa614ea04703480b1022c",
      ip: "1.15.13.216",
      id: "1",
      tags: ["malware", "cve-2017-0147"],
      detections: 1,
      firstReport: new Date(
        "Sep 21 2023 22:12:05 GMT+0200 (Central European Summer Time)"
      ).toLocaleDateString(),
      lastReport: new Date().toLocaleDateString(),
      submitters: ["submitter1", "submitter2"],
      icon: "icon",

      yara_results: [
        {
          description: "Detects WannaCry Ransomware",
          source: "https://github.com/Neo23x0/signature-base",
          author: "Florian Roth (Nextron Systems) (with the help of binar.ly)",
          ruleset_name: "crime_wannacry",
          rule_name: "WannaCry_Ransomware",
          ruleset_id: "000fd39f0d",
        },
        {
          description: "Yara rule that detects WannaCry ransomware.",
          source: "https://github.com/reversinglabs/reversinglabs-yara-rules",
          author: "ReversingLabs",
          ruleset_name: "Win32.Ransomware.WannaCry",
          rule_name: "Win32_Ransomware_WannaCry",
          ruleset_id: "0056142681",
        },
      ],
    };

    dispatch(setReport(reportTemplate));
  }, []);

  return (
    <div className="container p-6 w-10/12 flex justify-center flex-col items-center mx-auto">
      {!report.id && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Report not found</h1>
          <p className="text-lg mb-8">
            The report you are looking for does not exist.
          </p>
        </div>
      )}
      {report.id && (
        <div>
          <div className="border border-blue-dark-300 shadow-md shadow-blue-dark-900 rounded-lg p-4 flex flex-col w-full">
            <div className="space-y-2 flex flex-row justify-between items-center w-full">
              <div className="flex items-center text-sm">
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-row items-center">
                    <FaInfoCircle className="text-red-600 mr-2" size={16} />
                    <span className="text-base font-medium">{report.hash}</span>
                  </div>
                  <a
                    href="#"
                    className="ml-2 hover:text-blue-500 text-blue-400"
                  >
                    {report.ip}
                  </a>
                </div>
              </div>
              <div className="flex items-center flex-row justify-evenly w-2/12">
                <div className="flex flex-col gap-y-2 text-sm items-center">
                  <span className="mr-4">Size: 2.5MB</span>
                  <span>Last Analyzed: {report.lastReport}</span>
                </div>
                {/* Icon of bug */}
                <div>
                  <FaBug className="text-red-600" size={32} />
                </div>
              </div>
            </div>
            {/* Tags */}
            <div className="mt-4">
              <div className="space-x-2">
                {report.tags.map((tag) => {
                  return (
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 text-sm rounded">
                      {tag}
                    </span>
                  );
                })}

                {/* Add more tags as needed */}
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <Tabs
              tabs={[
                { label: "Detection", value: "detection" },
                { label: "Details", value: "details" },
                { label: "Relations", value: "relations" },
              ]}
              divStyle="flex justify-center space-x-4 mb-8 h-16 w-full border-b border-b-blue-dark-300 pb-2"
              buttonStyle="tab-button p-2 rounded-sm w-3/12"
              activeButtonStyle="tab-button p-2 rounded-sm w-3/12 border-b-4 border-b-blue-600"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <>
            {activeTab === "detection" && (
              <section className="w-full flex justify-center items-center">
                {/* Making simple alerts. Make it for YARA rules */}
                <YaraList yaraDetections={report.yara_results ?? []} />
              </section>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default Report;
