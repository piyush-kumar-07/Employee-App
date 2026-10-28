import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native';

import type { Employee } from '../../types/employee';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

// ✅ FIX 1 & 2: Use NativeStackScreenProps to automatically get both 'route' AND 'navigation'
type Props = NativeStackScreenProps<RootStackParamList, 'EmployeeDetails'>;

// ✅ Extract both route and navigation from props
function EmployeeDetailsScreen({ route, navigation }: Props) {
    const { employee } = route.params;

    // ✅ FIX 3: Added safe fallbacks so it doesn't crash if a name is missing
    const initials =
        `${employee.firstName?.charAt(0) ?? ''}${employee.lastName?.charAt(0) ?? ''}`.toUpperCase();

    return (
        <ScrollView style={styles.container}>
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

            <Pressable
                style={({ pressed }) => [
                    styles.editButton,
                    pressed && { opacity: 0.8 } // Added a nice press effect
                ]}
                onPress={() =>
                    navigation.navigate('EditEmployee', { employee })
                }
            >
                <Text style={styles.editButtonText}>Edit Employee</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
    editButton: {
        backgroundColor: '#2563EB',
        marginHorizontal: 20,
        marginTop: 4,
        marginBottom: 28,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});

export default EmployeeDetailsScreen;