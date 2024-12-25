import React from 'react';
import { StyleSheet, View } from 'react-native';
import GlassMorphicWrapper from '../navigation/GlassMorphicWrapper';
import TabNavigator from '../navigation/TabNavigator';

const MainScreen = () => {
  return (
    <GlassMorphicWrapper>
      <View style={styles.container}>
        <TabNavigator />
      </View>
    </GlassMorphicWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default MainScreen;