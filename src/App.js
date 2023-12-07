import React from "react";
import EmployeeAdd from "./Components/EmployeeAdd";
import NavBar from "./Components/NavBar";
import Table from "./Components/Table";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Card from "./Components/Card";
import Edit from "./Components/Edit";
import ShowEmployee from "./Components/ShowEmployee";

function App() {
  return (
    <Router>
      <NavBar />
      
      <Routes>

        <Route path="/employee/add" element={<EmployeeAdd />} />
        <Route path="/employee/list" element={<ShowEmployee />} />
        {/* <Route path="/employee/list(grid view)" element={<Card />} /> */}
        <Route path="/employee/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
