import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Spinner from '../components/Spinner';

const SettingsScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

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

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: theme.white,
  }
});

export default SettingsScreen;