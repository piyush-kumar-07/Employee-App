import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EmployeeListScreen from '../screens/employees/EmployeeListScreen';
import EmployeeDetailsScreen from '../screens/employees/EmployeeDetailsScreen';
import AddEmployeeScreen from '../screens/employees/AddEmployeeScreen';
import type { Employee } from '../types/employee';
import EditEmployeeScreen from '../screens/employees/EditEmployeeScreen';

// ✅ 1. Define the types for navigation
export type RootStackParamList = {
    EmployeeList: {
        newEmployee?: Employee;
        updatedEmployee?: Employee;
    } | undefined;
    EmployeeDetails: { employee: Employee };
    AddEmployee: undefined;
    EditEmployee: { employee: Employee };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="EmployeeList"
                screenOptions={{
                    headerStyle: { backgroundColor: '#FFFFFF' },
                    headerTintColor: '#172033',
                    headerTitleStyle: { fontWeight: '600' },
                    contentStyle: { backgroundColor: '#F8FAFC' },
                    headerBackTitle: '',
                }}
            >
                <Stack.Screen
                    name="EmployeeList"
                    component={EmployeeListScreen}

                    options={{ title: 'Employees' }}
                />
                <Stack.Screen
                    name="EmployeeDetails"
                    component={EmployeeDetailsScreen}

                    options={{ title: 'Employee Details' }}
                />
                <Stack.Screen
                    name="AddEmployee"
                    component={AddEmployeeScreen}
                    options={{ title: 'Add Employee' }}
                />
                <Stack.Screen
                    name="EditEmployee"
                    component={EditEmployeeScreen}
                    options={{ title: 'Edit Employee' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;