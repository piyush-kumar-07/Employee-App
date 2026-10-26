
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import type { Employee } from '../../types/employee';

type Props = {
    route: {
        params: {
            employee: Employee;
        };
    };
};

function EmployeeDetailsScreen({ route }: Props) {
    const { employee } = route.params;

    const initials =
        `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.avatar}>
                    <Text style={styles.initials}>{initials}</Text>
                </View>

                <Text style={styles.name}>
                    {employee.firstName} {employee.lastName}
                </Text>

                <Text style={styles.department}>
                    {employee.company.department}
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

                <Text style={styles.label}>Employee ID</Text>
                <Text style={styles.value}>{employee.id}</Text>
            </View>
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
        paddingVertical: 30,
        paddingHorizontal: 20,
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
    },
    value: {
        fontSize: 15,
        color: '#172033',
        marginBottom: 16,
    },
});

export default EmployeeDetailsScreen;
