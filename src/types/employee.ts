export type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: {
        department: string;
        post: string;
    };
};
export type EmployeeApiResponse = {
    users: Employee[];
    total: number;
    skip: number;
    limit: number;

};