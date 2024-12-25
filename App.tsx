import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { StyleSheet, View } from 'react-native';

const App = () => {

  return (
    <ThemeProvider>
          <View style={styles.container}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;