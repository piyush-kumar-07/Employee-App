
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import axios from 'axios';

import type { Employee } from '../../types/employee';
import { getEmployees } from '../../services/employeeServices';

function EmployeeListScreen() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const filteredEmployees = employees.filter((employee) => {
        const query = search.trim().toLowerCase();

        const fullName =
            `${employee.firstName} ${employee.lastName}`.toLowerCase();

        return (
            fullName.includes(query) ||
            employee.email.toLowerCase().includes(query) ||
            employee.company.department.toLowerCase().includes(query)

        );

    });

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                setError('');

                const data = await getEmployees();
                setEmployees(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('Status:', error.response?.status);
                    console.log('Response:', error.response?.data);
                    console.log('Message:', error.message);
                    console.log('URL:', error.config?.url);
                } else {
                    console.log('Unexpected error:', error);
                }

                setError('Unable to load employees. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadEmployees();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.message}>Loading employees...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Employees</Text>
            <Text style={styles.subtitle}>
                {filteredEmployees.length}  of {employees.length}employees found
            </Text>

            <TextInput
                style={styles.searchInput}
                placeholder='Search name, email, departmen...'
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
                clearButtonMode='while-editing' />

            <FlatList
                data={filteredEmployees}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>
                            {item.firstName} {item.lastName}
                        </Text>

                        <Text style={styles.detail}>
                            {item.company.department}
                        </Text>

                        <Text style={styles.email}>{item.email}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.message}>
                        {search.trim()
                            ? 'No matching employees found.'
                            : 'No employees found'}
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#172033',
    },
    subtitle: {
        marginTop: 6,
        marginBottom: 20,
        color: '#64748B',
        fontSize: 14,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderColor: '#CBD5E1',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        marginBottom: 16,
        color: '#172033'
    },
    list: {
        paddingBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#172033',
    },
    detail: {
        marginTop: 6,
        fontSize: 14,
        color: '#2563EB',
    },
    email: {
        marginTop: 5,
        fontSize: 13,
        color: '#64748B',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    message: {
        marginTop: 12,
        color: '#64748B',
    },
    error: {
        color: '#DC2626',
        textAlign: 'center',
    },
});

export default EmployeeListScreen;
