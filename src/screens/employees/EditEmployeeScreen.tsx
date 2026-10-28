
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

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import type { Employee } from '../../types/employee';
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

    return (
        <View style={styles.container}>
            <Text>Edit Employee</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {

    },
})

export default EditEmployeeScreen;
