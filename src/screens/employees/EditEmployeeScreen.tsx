
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import {
    updateEmployee,
    type CreateEmployeeInput,
} from '../../services/employeeServices';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'EditEmployee'
>;

function EditEmployeeScreen({ navigation, route }: Props) {
    const { employee } = route.params;

    const [form, setForm] = useState<CreateEmployeeInput>({
        firstName: employee.firstName ?? '',
        lastName: employee.lastName ?? '',
        email: employee.email ?? '',
        phone: employee.phone ?? '',
        department: employee.company?.department ?? '',
        title: employee.company?.title ?? '',
    });

    const [loading, setLoading] = useState(false);

    const updateField = (
        field: keyof CreateEmployeeInput,
        value: string,
    ) => {
        setForm(current => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        const firstName = form.firstName.trim();
        const lastName = form.lastName.trim();
        const email = form.email.trim();
        const phone = form.phone.trim();
        const department = form.department.trim();
        const title = form.title.trim();

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !department ||
            !title
        ) {
            Alert.alert(
                'Missing information',
                'Please complete all fields.',
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            Alert.alert(
                'Invalid email',
                'Please enter a valid email address.',
            );
            return;
        }

        const updatedInput: CreateEmployeeInput = {
            firstName,
            lastName,
            email,
            phone,
            department,
            title,
        };

        try {
            setLoading(true);

            const updatedEmployee = await updateEmployee(
                employee.id,
                updatedInput,
            );

            navigation.navigate('EmployeeList', {
                updatedEmployee,
            });
        } catch (error) {
            console.log('Update employee error:', error);

            Alert.alert(
                'Update failed',
                'Unable to update the employee. Please try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    const renderField = (
        label: string,
        field: keyof CreateEmployeeInput,
        placeholder: string,
        keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default',
    ) => (
        <View style={styles.field} key={field}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={styles.input}
                value={form[field]}
                onChangeText={value => updateField(field, value)}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                keyboardType={keyboardType}
                autoCapitalize={field === 'email' ? 'none' : 'words'}
                autoCorrect={false}
            />
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.heading}>Edit Employee</Text>

                <Text style={styles.subtitle}>
                    Update the employee's information below.
                </Text>

                <View style={styles.card}>
                    {renderField('First Name', 'firstName', 'Enter first name')}
                    {renderField('Last Name', 'lastName', 'Enter last name')}
                    {renderField(
                        'Email Address',
                        'email',
                        'name@example.com',
                        'email-address',
                    )}
                    {renderField(
                        'Phone Number',
                        'phone',
                        'Enter phone number',
                        'phone-pad',
                    )}
                    {renderField('Department', 'department', 'e.g. Engineering')}
                    {renderField('Job Title', 'title', 'e.g. Software Developer')}

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed,
                            loading && styles.buttonDisabled,
                        ]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Save Changes</Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        padding: 20,
        paddingBottom: 36,
    },
    heading: {
        fontSize: 27,
        fontWeight: '700',
        color: '#172033',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 7,
        marginBottom: 22,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    field: {
        marginBottom: 17,
    },
    label: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 11,
        paddingHorizontal: 13,
        paddingVertical: 12,
        fontSize: 15,
        color: '#172033',
    },
    button: {
        backgroundColor: '#2563EB',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});

export default EditEmployeeScreen;
