import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const backgroundImage = require('../../assets/img/background.jpg');

  return (
    <View style={styles.container}>
      <FastImage
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // This makes the image fill the container
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default BackgroundWrapper;
