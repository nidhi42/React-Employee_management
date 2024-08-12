import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { addEmployee, updateEmployee, deleteEmployee } from './store/employeeSlice';
import { IEmployee } from "./employee.type";
import EmployeeTableList from "./components/employeeList";
import EmployeeForm from "./components/employeeForm";
import ConfirmationModal from "./components/confimrationModel";

const App = () => {
  const employeeList = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch<AppDispatch>();
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const addEmployeeHnd = (data: IEmployee) => {
    dispatch(addEmployee(data));
    navigate('/');
  };

  const deleteEmployeeHnd = (id: string) => {
    console.log("Delete button clicked for employee with id:", id);
    setEmployeeToDelete(id);
    setIsModalVisible(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      dispatch(deleteEmployee(employeeToDelete));
      setEmployeeToDelete(null);
    }
    setIsModalVisible(false);
  };

  const cancelDelete = () => {
    setEmployeeToDelete(null);
    setIsModalVisible(false);
  };

  const editEmployeeHnd = (data: IEmployee) => {
    setDataToEdit(data);
    navigate('/edit');
  };

  const updateEmployeeHnd = (data: IEmployee) => {
    dispatch(updateEmployee(data));
    navigate('/');
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
                onClick={() => navigate('/add')}
                className="add-employee-btn"
              />
              <EmployeeTableList
                list={employeeList}
                onDeleteClickHnd={deleteEmployeeHnd}
                onEdit={editEmployeeHnd}
              />
            </div>
          } />
          <Route path="/add" element={
            <EmployeeForm
              isEditMode={false}
              onBackButtonClickHnd={() => navigate('/')}
              onSubmitClickHnd={addEmployeeHnd}
              onUpdateClickHnd={updateEmployeeHnd}
            />
          } />
          <Route path="/edit" element={
            <EmployeeForm
              isEditMode={true}
              data={dataToEdit}
              onBackButtonClickHnd={() => navigate('/')}
              onSubmitClickHnd={updateEmployeeHnd}
              onUpdateClickHnd={updateEmployeeHnd}
            />
          } />
        </Routes>
      </section>
      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default App;
