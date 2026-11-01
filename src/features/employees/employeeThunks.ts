
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../../services/employeeServices';

import type { Employee } from '../../types/employee';

import type { CreateEmployeeInput } from '../../services/employeeServices';

// Fetch all employees
export const fetchEmployees = createAsyncThunk<
    Employee[],//return  or pending
    void,// argument or fulfilled
    { rejectValue: string }//rejection 
>(
    'employees/fetchEmployees',
    async (_, { rejectWithValue }) => {
        try {
            const employees = await getEmployees();
            return employees;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to fetch employees',
            );
        }
    },
);

// Add a new employee
export const addEmployee = createAsyncThunk<
    Employee,
    CreateEmployeeInput,
    { rejectValue: string }
>(
    'employees/addEmployee',
    async (employee, { rejectWithValue }) => {
        try {
            return await createEmployee(employee);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to add employee',
            );
        }
    },
);

// Update an existing employee
export const editEmployee = createAsyncThunk<
    Employee,
    { id: number; employee: CreateEmployeeInput },
    { rejectValue: string }
>(
    'employees/editEmployee',
    async ({ id, employee }, { rejectWithValue }) => {
        try {
            return await updateEmployee(id, employee);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to update employee',
            );
        }
    },
);

// Delete an employee
export const removeEmployee = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    'employees/removeEmployee',
    async (id, { rejectWithValue }) => {
        try {
            await deleteEmployee(id);
            return id;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete employee',
            );
        }
    },
);
