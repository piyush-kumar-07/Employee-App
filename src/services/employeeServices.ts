
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

export const getEmployeeById = async (
    id: number
): Promise<Employee> => {
    const response = await api.get<Employee>(`/users/${id}`);

    return response.data;
};
