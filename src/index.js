import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MaterialList from "./components/Materials/MaterialList";
import MaterialDetails from "./components/Materials/MaterialDetails";
import CreateMaterial from "./components/Materials/CreateMaterial";
import PatronList from "./components/Patrons/PatronList";
import PatronDetails from "./components/Patrons/PatronDetails";
import PatronEdit from "./components/Patrons/PatronEdit";
import CheckoutList from "./components/Checkouts/CheckoutList";
import BrowseList from "./components/Materials/BrowseList";
import { CheckoutMaterial } from "./components/Checkouts/CheckoutMaterial";
import OverdueCheckoutList from "./components/Checkouts/OverdueCheckoutList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="materials">
          <Route index element={<MaterialList />} />
          <Route path=":id" element={<MaterialDetails />} />
          <Route path="create" element={<CreateMaterial />} />
          <Route path="browse" element={<BrowseList />} />
        </Route>
        <Route path="patrons">
          <Route index element={<PatronList />} />
          <Route path=":id" element={<PatronDetails />} />
          <Route path=":id/edit" element={<PatronEdit />} />
        </Route>
        <Route path="checkouts">
          <Route index element={<CheckoutList />} />
          <Route path=":id" element={<CheckoutMaterial />} />
          <Route path="overdue" element={<OverdueCheckoutList />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
