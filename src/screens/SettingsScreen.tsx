import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Spinner from '../components/Spinner';

const SettingsScreen = () => {
  const { colors, fontSizes, fonts } = useTheme();
  const styles = createStyles(colors, fonts, fontSizes);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
    </View>
  );
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg_blue
  },
  text: {
    fontSize: 24,
    color: colors.text_white,
  }
});

export default SettingsScreen;