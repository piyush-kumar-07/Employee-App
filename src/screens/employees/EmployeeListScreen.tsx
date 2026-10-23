import React, { use, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { Employee } from '../../types/Employee';
import { getEmployees } from '../../services/EmployeeServices';

function EmployeeListScreen() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


}