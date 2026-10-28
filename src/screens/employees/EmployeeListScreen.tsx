import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import axios from 'axios';

import type { Employee } from '../../types/employee';
import { getEmployees } from '../../services/employeeServices';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'EmployeeList'
>;

function EmployeeListScreen({ navigation, route }: Props) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

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


    useEffect(() => {
        const newEmployee = route.params?.newEmployee;

        if (!newEmployee) {
            return;
        }

        setEmployees(current => {
            const alreadyExists = current.some(
                employee => employee.id === newEmployee.id
            );

            if (alreadyExists) {
                return current;
            }

            return [newEmployee, ...current];
        });

        setSearch('');
        navigation.setParams({ newEmployee: undefined });
    }, [route.params?.newEmployee, navigation]);

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
                <Text style={styles.muted}>Loading employees...</Text>
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
            <Pressable
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEmployee')}
            >
                <Text style={styles.addButtonText}>+ Add Employee</Text>
            </Pressable>
            <View style={styles.header}>
                <View>
                    <Text style={styles.head}>EMPLOYEE MANAGEMENT</Text>
                    <Text style={styles.heading}>Employees</Text>
                    <Text style={styles.subtitle}>
                        {filteredEmployees.length} of {employees.length} employees
                    </Text>
                </View>

                <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>
                        {employees.length}
                    </Text>
                </View>
            </View>

            <View style={styles.searchBox}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name, email, department"
                    placeholderTextColor="#94A3B8"
                    value={search}
                    onChangeText={setSearch}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* ✅ Custom clear button for Android & iOS */}
                {search.length > 0 && (
                    <Pressable
                        style={styles.clearButton}
                        onPress={() => setSearch('')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
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
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const initials =
                        `${item.firstName?.charAt(0) ?? ''}${item.lastName?.charAt(0) ?? ''}`.toUpperCase();

                    return (
                        <Pressable
                            style={({ pressed }) => [
                                styles.card,
                                pressed && styles.cardPressed,
                            ]}
                            onPress={() =>
                                navigation.navigate('EmployeeDetails', { employee: item })
                            }
                        >
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{initials}</Text>
                            </View>

                            <View style={styles.employeeInfo}>
                                <Text style={styles.name}>
                                    {item.firstName} {item.lastName}
                                </Text>
                                <Text style={styles.department}>
                                    {item.company?.department ?? '—'}
                                </Text>
                                <Text style={styles.email} numberOfLines={1}>
                                    {item.email}
                                </Text>
                            </View>

                            <Text style={styles.chevron}>›</Text>
                        </Pressable>
                    );
                }}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyTitle}>No employees found</Text>
                        <Text style={styles.muted}>
                            Try another name, email, or department.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingTop: 18,
        paddingHorizontal: 11,
    },
    addButton: {
        backgroundColor: '#2563EB',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 11,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 13,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 22,
    },
    head: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.1,
        color: '#64748B',
        marginBottom: 7,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#172033',
    },
    subtitle: {
        marginTop: 5,
        fontSize: 13,
        color: '#64748B',
    },
    headerBadge: {
        width: 46,
        height: 46,
        borderRadius: 16,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBadgeText: {
        color: '#1D4ED8',
        fontSize: 17,
        fontWeight: '700',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 14,
        paddingHorizontal: 13,
        marginBottom: 18,
    },
    searchIcon: {
        color: '#64748B',
        fontSize: 25,
        marginRight: 9,
    },
    searchInput: {
        flex: 1,
        minHeight: 49,
        fontSize: 14,
        color: '#172033',
    },
    clearButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    clearButtonText: {
        fontSize: 18,
        lineHeight: 20,
        color: '#475569',
        fontWeight: '700',
        marginTop: -2,
    },
    list: {
        paddingBottom: 8,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E9EEF5',
    },
    cardPressed: {
        opacity: .8,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#1D4ED8',
        fontWeight: '700',
        fontSize: 15,
    },
    employeeInfo: {
        flex: 1,
    },
    name: {
        color: '#172033',
        fontWeight: '600',
        fontSize: 15,
    },
    department: {
        color: '#2563EB',
        fontSize: 12,
        marginTop: 4,
    },
    email: {
        color: '#64748B',
        fontSize: 12,
        marginTop: 4,
    },
    chevron: {
        color: '#94A3B8',
        fontSize: 26,
        marginLeft: 8,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    muted: {
        color: '#64748B',
        marginTop: 10,
        fontSize: 13,
        textAlign: 'center',
    },
    error: {
        color: '#2563EB',
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 16,
        backgroundColor: '#2563EB',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
    },
    retryText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    empty: {
        alignItems: 'center',
        paddingVertical: 45,
    },
    emptyTitle: {
        color: '#172033',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default EmployeeListScreen;