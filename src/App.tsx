import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { IEmployee } from "./employee.type";
import EmployeeTableList from "./components/employeeList";
import EmployeeForm from "./components/employeeForm";


const App = () => {
  const [employeeList, setEmployeeList] = useState([] as IEmployee[]);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);
  const navigate = useNavigate();

  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList");
    if (listInString) {
      setEmployeeList(JSON.parse(listInString));
    }
  }, []);

  const addEmployeeHnd = (data: IEmployee) => {
    _setEmployeeList([...employeeList, data]);
    navigate('/'); // Redirect back to the list page after adding
  };

  const deleteEmployee = (data: IEmployee) => {
    const tempList = employeeList.filter(emp => emp.id !== data.id);
    _setEmployeeList(tempList);
  };

  const editEmployee = (data: IEmployee) => {
    setDataToEdit(data);
    navigate('/edit'); // Redirect to the edit page
  };

  const updateData = (data: IEmployee) => {
    const updatedList = employeeList.map(emp =>
      emp.id === data.id ? { ...data } : emp
    );
    _setEmployeeList(updatedList);
    navigate('/'); // Redirect back to the list page after updating
  };

  const _setEmployeeList = (list: IEmployee[]) => {
    setEmployeeList(list);
    window.localStorage.setItem("EmployeeList", JSON.stringify(list));
  };

  return (
    <>
      <article className="header">
        <header>
          <h1>React CRUD Operations</h1>
        </header>
      </article>
      <section className="content-section">
        
        <Routes>
          <Route path="/" element={
            <div>
              <input
                type="button"
                value="Add Employee"
                onClick={() => window.location.href = '/'}
                className="add-employee-btn"
              />
              <EmployeeTableList
                list={employeeList}
                onDeleteClickHnd={deleteEmployee}
                onEdit={editEmployee}
              />
            </div>
          } />
          <Route path="/add" element={
            <EmployeeForm
              isEditMode={false}
              onBackButtonClickHnd={() => navigate('/')}
              onSubmitClickHnd={addEmployeeHnd}
              onUpdateClickHnd={updateData}
            />
          } />
          <Route path="/edit" element={
            <EmployeeForm
              isEditMode={true}
              data={dataToEdit}
              onBackButtonClickHnd={() => navigate('/')}
              onSubmitClickHnd={updateData} // Changed to updateData
              onUpdateClickHnd={updateData}
            />
          } />
        </Routes>
  
      </section>
    </>
  );
};

export default App;
