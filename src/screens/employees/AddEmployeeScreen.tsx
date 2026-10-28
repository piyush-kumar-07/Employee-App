
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    View,
} from 'react-native';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'AddEmployee'>;

import { createEmployee } from '../../services/employeeServices';
import type { CreateEmployeeInput } from '../../services/employeeServices';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
function AddEmployeeScreen({ navigation }: Props) {
    const [form, setForm] = useState<CreateEmployeeInput>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        title: '',
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
        const { firstName, lastName, email, phone, department, title } = form;

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !department.trim() ||
            !title.trim()
        ) {
            Alert.alert('Missing information', 'Please complete all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            Alert.alert('Invalid email', 'Please enter a valid email address.');
            return;
        }

        try {
            setLoading(true);

            const created = await createEmployee({
                ...form,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                department: department.trim(),
                title: title.trim(),
            });

            navigation.navigate('EmployeeList', {
                newEmployee: created,
            });
        } catch (error) {
            console.log('Create employee error:', error);

            Alert.alert(
                'Request failed',
                'Unable to create the employee. Please try again.',
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

            behavior="padding"

            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.heading}>Add Employee</Text>
                <Text style={styles.subtitle}>
                    Enter the employee's information below.
                </Text>

                <View style={styles.card}>
                    {renderField('First Name', 'firstName', 'Enter first name')}
                    {renderField('Last Name', 'lastName', 'Enter last name')}
                    {renderField('Email Address', 'email', 'name@example.com', 'email-address')}
                    {renderField('Phone Number', 'phone', 'Enter phone number', 'phone-pad')}
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
                            <Text style={styles.buttonText}>Create Employee</Text>
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
        flexGrow: 1,
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

export default AddEmployeeScreen;
