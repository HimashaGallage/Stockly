import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Spinner = () => {
  const theme = useTheme();

  return (
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" color={theme.green} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
