import { createSlice } from '@reduxjs/toolkit';

import type { Employee } from '../../types/employee';

import {
    fetchEmployees,
    addEmployee,
    // editEmployee,   // (Commented out since you only want Fetch and Add for now)
    // removeEmployee, // (Commented out)
} from './employeeThunks';

type EmployeeState = {
    employees: Employee[];
    loading: boolean;
    error: string | null;
};

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},

    extraReducers: builder => {
        // ── 1. FETCH EMPLOYEES ──────────────────────────────────────
        builder
            .addCase(fetchEmployees.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Unable to fetch employees';
            });

        // ── 2. ADD EMPLOYEE ─────────────────────────────────────────
        builder
            .addCase(addEmployee.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false;
                // ✅ Pushes the new employee to the END of the list
                state.employees.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Unable to add employee';
            });
    }, // 👈 Notice the extra closing bracket from your original code is fixed here
});

// ✅ Export the reducer so Redux can use it in the store
export default employeeSlice.reducer;