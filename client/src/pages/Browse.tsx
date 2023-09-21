import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tabs from "../components/Common/Tabs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { FaFileDownload, FaFileExport } from "react-icons/fa";

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
  quantity?: number;
  inventoryStatus?: string;
  rating?: number;
}

const Browse = () => {
  // Dummy data for reports
  const reportReports = [
    {
      id: 1,
      title: "Report 1",
      description: "This is the first report",
    },
    {
      id: 2,
      title: "Report 2",
      description: "This is the second report",
    },
  ];

  const fileReports = [
    {
      id: 1,
      title: "File 1",
      description: "This is the first file",
    },
  ];

  const [activeTab, setActiveTab] = useState("reports");
  const [reportsDisplaying, setReportsDisplaying] = useState(25); // The amount of reports displaying, default is 25

  useEffect(() => {
    //check the amount of reports displaying, if it is less than the amount of reports, then display the amount of reports, else display the amount of reports
    if (reportsDisplaying < reportReports.length) {
      setReportsDisplaying(reportsDisplaying);
    } else {
      setReportsDisplaying(reportReports.length);
    }
  }, [activeTab, reportReports.length, reportsDisplaying]);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(
    null
  );

  useEffect(() => {
    const product = {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    };

    setProducts([product]);
  }, []);

  return (
    <div>
      <div className="container mx-auto mt-8 text-center">
        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            checked={selectedProducts?.length === products.length}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedProducts(products);
              } else {
                setSelectedProducts([]);
              }
            }}
          />
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            divStyle="flex justify-center space-x-4 mb-8 h-8 w-full"
            buttonStyle="rounded-sm w-3/12"
            activeButtonStyle="rounded-sm w-3/12 border-b-[3px] border-b-blue-600"
            tabs={[
              {
                label: `Reports ${reportReports.length}/${reportReports.length}`,
                value: "reports",
              },
              {
                label: "Files",
                value: "files",
              },
            ]}
          />
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
          value={products}
          selectionMode={"multiple"}
          selection={selectedProducts!}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
          className=" text-gray-700 dark:text-white"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          {/* Make a cell already selected */}
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Browse;
