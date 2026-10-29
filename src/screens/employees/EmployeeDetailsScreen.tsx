import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Alert,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { deleteEmployee } from '../../services/employeeServices';

type Props = NativeStackScreenProps<RootStackParamList, 'EmployeeDetails'>;

function EmployeeDetailsScreen({ route, navigation }: Props) {
    const { employee } = route.params;
    const [menuVisible, setMenuVisible] = useState(false);

    const handleDelete = () => {
        Alert.alert(
            'Delete Employee',
            `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteEmployee(employee.id);

                            navigation.navigate('EmployeeList', {
                                deleteEmployee: employee.id,
                            });
                        } catch (error) {
                            console.log('Delete employee error:', error);

                            Alert.alert(
                                'Delete failed',
                                'Unable to delete this employee. Please try again.',
                            );
                        }
                    },
                },
            ],
        );
    };

    const initials =
        `${employee.firstName?.charAt(0) ?? ''}${employee.lastName?.charAt(0) ?? ''}`.toUpperCase();



    return (
        <ScrollView style={styles.container}>

            {/* ✅ The menu is now safely inside the scroll view */}
            <View style={styles.menuContainer}>
                <Pressable
                    style={styles.menuButton}
                    onPress={() => setMenuVisible(current => !current)}
                >
                    <Text style={styles.menuDots}>⋮</Text>
                </Pressable>


                {menuVisible && (
                    <View style={styles.menuDropdown}>
                        <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                navigation.navigate('EditEmployee', { employee });
                            }}
                        >
                            <Text style={styles.menuItemText}>Edit Employee</Text>
                        </Pressable>

                        <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                handleDelete();
                            }}
                        >
                            <Text style={[styles.menuItemText, styles.deleteText]}>
                                Delete Employee
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>

            <View style={styles.profile}>
                <View style={styles.avatar}>
                    <Text style={styles.initials}>{initials || '?'}</Text>
                </View>

                <Text style={styles.name}>
                    {employee.firstName} {employee.lastName}
                </Text>

                <Text style={styles.label}>Employee ID</Text>
                <Text style={styles.value}>{employee.id}</Text>

                <Text style={styles.department}>
                    {employee.company?.department ?? '—'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{employee.email}</Text>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{employee.phone}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Work Information</Text>
                <Text style={styles.label}>Department</Text>
                <Text style={styles.value}>{employee.company?.department ?? '—'}</Text>
                <Text style={styles.label}>Job Title</Text>
                <Text style={styles.value}>{employee.company?.title ?? 'Not provided'}</Text>
            </View>




        </ScrollView>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    menuContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 20,
        marginTop: 10,
        zIndex: 10, // ✅ FIX: Bumped zIndex so it stays above other elements
    },
    menuButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    menuDots: {
        fontSize: 28,
        lineHeight: 32,
        color: '#172033',
    },
    menuDropdown: {
        position: 'absolute',
        top: 46,
        right: 0,
        minWidth: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    deleteText: {
        color: '#f50606e3',
    },
    menuItemText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#172033',
    },
    profile: {
        alignItems: 'center',
        paddingVertical: 28,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    initials: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1D4ED8',
    },
    name: {
        fontSize: 23,
        fontWeight: '700',
        color: '#172033',
    },
    department: {
        marginTop: 6,
        fontSize: 14,
        color: '#2563EB',
    },
    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#172033',
        marginBottom: 18,
    },
    label: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 5,
        marginTop: 8,
    },
    value: {
        fontSize: 15,
        color: '#172033',
        marginBottom: 16,
    },
});

export default EmployeeDetailsScreen;