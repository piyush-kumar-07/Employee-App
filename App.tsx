import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
function App() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.heading}>
        Employee Management
      </Text>
      <Text style={Styles.subtitle}>
        Manage your employee in one place .
      </Text>
    </View>
  )
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 15,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#172033",

  },
  subtitle: {
    fontSize: 8,
    marginTop: 8,

  },
});
export default App;
