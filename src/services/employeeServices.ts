
import api from './api';
import type {
    Employee,
    EmployeeApiResponse,
} from '../types/employee';

export const getEmployees = async (): Promise<Employee[]> => {
    const response = await api.get<EmployeeApiResponse>(
        '/users?limit=30'
    );

    return response.data.users;
};
export type CreateEmployeeInput = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    title: string;
};

export const createEmployee = async (
    employee: CreateEmployeeInput
): Promise<Employee> => {
    const response = await api.post<Employee>('/users/add', {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        company: {
            department: employee.department,
            title: employee.title,
        },
    });

    return response.data;
};
// for editing an existing record
export const updateEmployee = async (
    id: number,
    employee: CreateEmployeeInput,
): Promise<Employee> => {
    const response = await api.put<Employee>(`/users/${id}`, {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        company: {
            department: employee.department,
            title: employee.title,
        },
    });

    return response.data;
};

export const getEmployeeById = async (
    id: number
): Promise<Employee> => {
    const response = await api.get<Employee>(`/users/${id}`);

    return response.data;
};
