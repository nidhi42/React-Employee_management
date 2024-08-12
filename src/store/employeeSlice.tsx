import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../employee.type';

// Load initial state from Local Storage
const initialState: IEmployee[] = JSON.parse(localStorage.getItem('EmployeeList') || '[]');

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.push(action.payload);

      localStorage.setItem('EmployeeList', JSON.stringify(state));
    },
    updateEmployee: (state, action: PayloadAction<IEmployee>) => {
      const index = state.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        
        state[index] = action.payload;
      
        localStorage.setItem('EmployeeList', JSON.stringify(state));
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter(emp => emp.id !== action.payload);
      localStorage.setItem('EmployeeList', JSON.stringify(updatedState));
      return updatedState;
    }
  }
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
