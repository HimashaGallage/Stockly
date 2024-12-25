import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Spinner from '../components/Spinner';
import NetInfo from '@react-native-community/netinfo';

const HomeScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const backgroundImage = require('../../assets/img/background.jpg');
  const data = [...Array(6).keys()]; 

  // State to manage loading and errors
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // Check internet connection
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        setHasError(true);
        setIsLoading(false);
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
        return;
      }

      // Simulate data fetching
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>An error occurred. Please try again later.</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.fullWidthCard}>
          <View style={styles.storageInfo}>
            <View>
              <Text style={styles.smallText}>Available balance</Text>
              <Text style={styles.largeText}>{'$16085.32'}</Text>
            </View>
          </View>
          <View style={styles.totalStorage}>
            <Text style={styles.smallText}>Last Activity</Text>
            <Text style={styles.largeText}>{'12 DEC 2024'}</Text>
          </View>
        </View>

        <View style={styles.foldersHeader}>
          <Text style={styles.featured}>Featured</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>see all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.glassmorphicCard}>
              <Text style={styles.smallText}>Item {item + 1}</Text>
              <Text style={styles.largeText}>Details</Text>
            </View>
          )}
          contentContainerStyle={styles.foldersContainer}
        />
      </View>
    </ImageBackground>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.transparent_dark,
  },
  scrollContainer: {
    padding: 16,
  },
  totalStorage: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  foldersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  linkText: {
    fontSize: 14,
    color: theme.white,
  },
  featured: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.white,
  },
  fullWidthCard: {
    backgroundColor: theme.transparent_light,
    borderRadius: 16,
    padding: 20,
    width: '95%',
    marginBottom: 16,
    borderColor: theme.transparent_dark,
    borderWidth: 1,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  glassmorphicCard: {
    backgroundColor: theme.transparent_light,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    marginHorizontal: '1%',
    borderColor: theme.transparent_dark,
    borderWidth: 1,
    shadowColor: theme.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  foldersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 14,
    color: theme.white,
  },
  largeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.transparent_light,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: theme.warning_orange,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;