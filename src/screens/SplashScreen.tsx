import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const SplashScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/logo.png')}
        style={styles.container}
        resizeMode='center'
      />
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

export default SplashScreen;

