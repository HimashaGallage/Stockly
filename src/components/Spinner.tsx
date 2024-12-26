import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

const Spinner = () => {
  const { colors, fontSizes, fonts } = useTheme();

  return (
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" color={colors.green} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg_blue
  },
});

export default Spinner;
