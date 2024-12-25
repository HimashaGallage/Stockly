import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const GlassMorphicWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={{ flex: 1 }}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={50}
        reducedTransparencyFallbackColor="white"
      />
      {children}
    </View>
  );
};

export default GlassMorphicWrapper;