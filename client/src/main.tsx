import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.tsx";
import "./index.css";
import Layout from "./layout/index.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Browse from "./pages/Browse.tsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import Report from "./pages/Report.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="browse" element={<Browse />} />
              <Route path="report" element={<Report />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
