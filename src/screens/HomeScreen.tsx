import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ListRenderItemInfo } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Spinner from '../components/Spinner';
import NetInfo from '@react-native-community/netinfo';


type DataItem = number;
const data: DataItem[] = Array.from({ length: 6 }, (_, index) => index);

const HomeScreen = () => {
  const { colors, fontSizes, fonts } = useTheme();
  const styles = createStyles(colors, fonts, fontSizes);


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

  const renderItem = ({ item, index }: ListRenderItemInfo<DataItem>) => {
    const isFirstColumn = index % 2 === 0;
    return (
      <View style={[styles.folderCard, isFirstColumn && styles.firstColumn]}>
        <Text style={styles.smallText}>Item {item + 1}</Text>
        <Text style={styles.largeText}>Details</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet</Text>
      </View>
    );
  };

  return (
    /* Todo - Dummy purpose only */
    <View style={styles.container}>
      <View style={styles.cardContainer}>
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
          <Text style={styles.linkText}>see all</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.toString()}
          numColumns={2} // 2 columns
          renderItem={renderItem}
          contentContainerStyle={styles.folderContainer}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
      </View>
    </View>
  );
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg_blue
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.gm_light,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthCard: {
    backgroundColor: colors.gm_light,
    borderRadius: 32,
    marginTop: 20,
    padding: 20,
    width: '95%',
    marginBottom: 16,
    borderColor: colors.gm_dark,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
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
    width: '85%',
    paddingVertical: 16
  },
  featured: {
    fontSize: fontSizes.xLarge,
    color: colors.text_white,
    fontWeight: 'bold'
  },
  linkText: {
    fontSize: fontSizes.medium,
    color: colors.text_white
  },
  folderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  folderCard: {
    marginBottom: 16,
    borderRadius: 32,
    width: '44%',
    padding: 30,
    borderWidth: 1,
    shadowColor: colors.bg_black,
    borderColor: colors.gm_dark,
    backgroundColor: colors.gm_light,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden'
  },
  smallText: {
    fontSize: 14,
    color: colors.text_white,
  },
  largeText: {
    fontSize: 18,
    color: colors.green,
    fontWeight: 'bold',
  },
  description: {
    overflow: 'hidden',
    fontSize: 14,
    color: colors.icon_pink,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gm_light,
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.warning_orange,
    textAlign: 'center',
    marginBottom: 20,
  },
  firstColumn: {
    marginRight: 50
  },
});

export default HomeScreen;