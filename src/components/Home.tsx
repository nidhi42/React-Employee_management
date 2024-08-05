import { useEffect, useState } from "react";
import "./Home.style.css";
import { IEmployee, PageEnum } from "../employee.type";
import EmployeeTableList from "./employeeList";

import EmployeeForm from "./employeeForm";

const Home = () => {
  
  const [employeeList, setEmployeeList] = useState(
    [] as IEmployee[]
  );
  const [shownPage, setShownPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as IEmployee)
  useEffect(() => {
    const listInString = window.localStorage.getItem("EmployeeList")
    if(listInString) {
      _setEmployeeList(JSON.parse(listInString))
    }
   
    
  }, [])
  const onAddClickHnd = () => {
   setShownPage(PageEnum.add)
  }
  const showListPage = () => {
   setShownPage(PageEnum.list)
  }
  const _setEmployeeList = (list: IEmployee[]) => {

    setEmployeeList(list)
    window.localStorage.setItem("EmployeeList", JSON.stringify(list))
  }
  const addEmployeeHnd = (data:IEmployee) => {
  //  setEmployeeList([...employeeList, data]);
   _setEmployeeList([...employeeList, data])

  }

  const deleteEmployee =  (data:IEmployee) => {
    const indexToDelete = employeeList.indexOf(data)
    const tempList = [...employeeList]
    tempList.splice(indexToDelete, 1)
    setEmployeeList(tempList)
  }
  const editEmployee = (data:IEmployee) => {
    setShownPage(PageEnum.edit)
    setDataToEdit(data)
  }
  const updateData = (data:IEmployee) => {
    const filteredData = employeeList.filter(x => x.id === data.id)[0];
    const indexOfRecord = employeeList.indexOf(filteredData)
    const tempData = [...employeeList]
    tempData[indexOfRecord] = data
    setEmployeeList(tempData)
  }
  return (

    <>
      <article className="header">
        <header>
          <h1>React Crud Operation</h1>
        </header>
      </article>
      <section className="content-section">
         {shownPage === PageEnum.list && 
         
         <><input type="button" value="Add Employee"  onClick={onAddClickHnd} className="add-employee-btn"/><EmployeeTableList list={employeeList} onDeleteClickHnd={deleteEmployee} onEdit={editEmployee}></EmployeeTableList></>
      }
        {shownPage === PageEnum.add && 
         
         <><EmployeeForm
         isEditMode={false}
         onBackButtonClickHnd={showListPage}
         onSubmitClickHnd={addEmployeeHnd}
         onUpdateClickHnd={updateData}
     /></>
      }
      {shownPage === PageEnum.edit && <><EmployeeForm
    isEditMode={true}
    data={dataToEdit}
    onBackButtonClickHnd={showListPage}
         onSubmitClickHnd={addEmployeeHnd}
         onUpdateClickHnd={updateData}
/></>}
      </section>
    </>
  );
};
export default Home;
