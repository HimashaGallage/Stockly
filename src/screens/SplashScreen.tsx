import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const SplashScreen = ({ navigation }: any) => {
  const { colors, fontSizes, fonts } = useTheme();
  const styles = createStyles(colors, fonts, fontSizes);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Tabs');
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

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});

export default SplashScreen;

