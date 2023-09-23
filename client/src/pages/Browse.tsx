import { useState, useEffect } from "react";
import Tabs from "../components/Common/Tabs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FaFileDownload, FaFileExport } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addReport } from "../store/browse/actions";

const Browse = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("reports");
  //const [reports, setReports] = useState<Report[]>([]);
  const reports = useSelector((state: RootState) => state.browse.reports);

  const [selectedReports, setSelectedReports] = useState<IReport[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    const report: IReport = {
      hash: "24d004a104d4d54034dbcffc2a4b19a11f39008a575aa614ea04703480b1022c",
      ip: "1.15.13.216",
      tags: ["malware", "cve-2017-0147"],
      detections: 1,
      firstReport: new Date(
        "Sep 21 2023 22:12:05 GMT+0200 (Central European Summer Time)"
      ).toLocaleDateString(),
      lastReport: new Date().toLocaleDateString(),
      submitters: ["submitter1", "submitter2"],
      icon: "icon",
    };
    // add id to the report
    const id = Math.random().toString(36).substr(2, 9);
    report.id = id;

    //setReports([report]);
    dispatch(addReport(report));
  }, []);

  useEffect(() => {
    // Check if all reports are selected
    if (selectAllChecked) {
      setSelectedReports(reports);
      //setSelectedReports(reports);
      setSelectAllChecked(true);
    } else {
      setSelectedReports([]);
      setSelectAllChecked(false);
    }
  }, [selectAllChecked, reports]);

  return (
    <div>
      <div className="container mx-auto mt-8 text-center">
        <div className="flex flex-row items-center border-b border-blue-dark-600 pb-2">
          <div className="flex flex-row items-center w-full">
            <input
              type="checkbox"
              checked={selectedReports?.length === reports.length}
              className="h-5 w-5 rounded-md border-gray-300 dark:border-white selection:border-blue-500"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedReports(reports);
                } else {
                  setSelectedReports([]);
                }
              }}
            />
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              divStyle="flex justify-center space-x-4 h-8 w-full"
              buttonStyle="rounded-sm w-3/12"
              activeButtonStyle="rounded-sm w-3/12 border-b-[3px] border-b-blue-600"
              tabs={[
                {
                  label: `Reports ${reports.length}/${reports.length}`,
                  value: "reports",
                },
                {
                  label: "Files",
                  value: "files",
                },
              ]}
            />
          </div>
          <div className="flex flex-row">
            <button>
              <FaFileExport
                className="mr-2 dark:text-blue-500 hover:text-blue-600"
                size={22}
              />
            </button>
            <button>
              <FaFileDownload
                className="mr-2 dark:text-blue-500 hover:text-blue-600"
                size={22}
              />
            </button>
          </div>
        </div>

        <DataTable
          size="small"
          value={reports}
          selection={selectedReports}
          onSelectionChange={(e) => setSelectedReports(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
          className="text-gray-700 dark:text-white"
          paginator
          cellSelection={false}
          // make the row not selectable, however, when clicking on the checkbox it will select the row
          selectionMode="checkbox"
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate={
            "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          }
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          <Column selectionMode="multiple" style={{ width: "3rem" }}></Column>
          {/* Empty header for the first column */}
          <Column
            header={<div></div>}
            body={(rowData: IReport) => (
              <Link to={"/"} className="w-full">
                <span className="font-normal text-base">
                  {rowData.hash.toUpperCase()}
                </span>
                <br />
                <span className="text-base text-gray-400">{rowData.ip}</span>
                <br />
                <div className="flex flex-row items-center gap-x-2 mt-1">
                  {rowData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="dark:bg-gray-800 rounded-md p-[2px] text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            )}
          ></Column>
          <Column
            field="detections"
            header="Detections"
            className="text-center"
          ></Column>
          <Column header="First Report" field={"firstReport"}></Column>
          <Column header="Last Report" field={"lastReport"}></Column>
          <Column
            header="Submitters"
            body={(rowData: IReport) => rowData.submitters.length}
            className="text-center"
          ></Column>
          <Column
            body={(rowData: IReport) => (
              <div className="text-center">
                <img src={rowData.icon} alt="Icon" className="w-8 h-8" />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Browse;
