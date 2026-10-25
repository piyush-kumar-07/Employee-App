import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
} from 'react-native';
import axios from 'axios';

import type { Employee } from '../../types/employee';
import { getEmployees } from '../../services/employeeServices';

function EmployeeListScreen() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);


    const loadEmployees = useCallback(async (isRefresh = false) => {
        try {
            setError('');

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const data = await getEmployees();
            setEmployees(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log('Employee API error:', err.message);
            }
            setError('Unable to load employees. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);


    const query = search.trim().toLowerCase();

    const filteredEmployees = employees.filter((employee) => {
        const fullName =
            `${employee.firstName ?? ''} ${employee.lastName ?? ''}`.toLowerCase();
        const email = (employee.email ?? '').toLowerCase();
        const department = (employee.company?.department ?? '').toLowerCase();

        return (
            fullName.includes(query) ||
            email.includes(query) ||
            department.includes(query)
        );
    });

    // ── Loading screen ───────────────────────────────────────────
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.message}>Loading employees...</Text>
            </View>
        );
    }

    // ── Error screen ─────────────────────────────────────────────
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>

                <Pressable
                    style={styles.retryButton}
                    onPress={() => loadEmployees()}
                >
                    <Text style={styles.retryText}>Try Again</Text>
                </Pressable>
            </View>
        );
    }

    // ── Success screen ───────────────────────────────────────────
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Employees</Text>


            <Text style={styles.subtitle}>
                {filteredEmployees.length} of {employees.length} employees found
            </Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name, email, department..."
                    placeholderTextColor="#94A3B8" // ✅ Forces placeholder to be grey in dark mode
                    value={search}
                    onChangeText={setSearch}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {search.length > 0 && (
                    <Pressable
                        style={styles.clearButton}
                        onPress={() => setSearch('')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // ✅ Makes it easier to tap
                        accessibilityLabel="Clear search"
                    >
                        <Text style={styles.clearButtonText}>×</Text>
                    </Pressable>
                )}
            </View>
            <FlatList
                data={filteredEmployees}
                keyExtractor={(item) => String(item.id)}
                refreshing={refreshing}
                onRefresh={() => loadEmployees(true)}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>
                            {item.firstName} {item.lastName}
                        </Text>

                        <Text style={styles.detail}>
                            {item.company?.department ?? '—'}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderColor: '#CBD5E1',
        borderWidth: 1,
        paddingHorizontal: 12,
        marginBottom: 16,
        height: 50, // ✅ Forces the height
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 15,
        color: '#172033', // ✅ Forces typed text to be dark
        paddingVertical: 0,
    },
    clearButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    clearButtonText: {
        fontSize: 22,
        lineHeight: 24,
        color: '#475569',
        fontWeight: 'bold',
        marginTop: -2,
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
    retryButton: {
        marginTop: 16,
        backgroundColor: '#2563EB',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});

export default EmployeeListScreen;