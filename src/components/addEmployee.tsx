import React from 'react';
import EmployeeForm from './employeeForm';
import { IEmployee } from '../employee.type';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();

  const handleAddEmployee = (data: IEmployee) => {
    // Handle adding employee logic here (e.g., update state or context)
    navigate('/');
  };

  return (
    <EmployeeForm
      isEditMode={false}
      onBackButtonClickHnd={() => navigate('/')}
      onSubmitClickHnd={handleAddEmployee}
      onUpdateClickHnd={() => {}} // No-op for add mode
    />
  );
};

export default AddEmployee;
