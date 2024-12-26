import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../theme/ThemeContext';
import { BOTTOM_TABS } from '../utils/constants';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import CryptoListScreen from '../screens/CryptoMarket/CryptoListScreen';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors, fontSizes, fonts } = useTheme();
  const styles = createStyles(colors, fonts, fontSizes);

  return (
    <>
    <Header onProfilePress={() => { }} onNotificationPress={() => { }} title={''} />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconName = getIconName(route.name, focused);
          return <Icon name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: colors.icon_pink,
        tabBarInactiveTintColor: colors.text_white,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name={BOTTOM_TABS.HOME} component={HomeScreen} />
      <Tab.Screen name={BOTTOM_TABS.MARKET} component={CryptoListScreen} />
      <Tab.Screen name={BOTTOM_TABS.PORTFOLIO} component={PortfolioScreen} />
      <Tab.Screen name={BOTTOM_TABS.SETTINGS} component={SettingsScreen} />
    </Tab.Navigator>
    </>
  );
};

const getIconName = (routeName: string, focused: boolean) => {
  const icons: { [key: string]: string } = {
    Home: focused ? 'home' : 'home-outline',
    Market: focused ? 'chart-line' : 'chart-line-variant',
    Portfolio: focused ? 'briefcase' : 'briefcase-outline',
    Settings: focused ? 'cog' : 'cog-outline',
  };
  return icons[routeName as keyof typeof icons] || 'circle-outline';
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
  tabBarStyle: {
    flex: 1,
    position: 'absolute',
    backgroundColor: colors.gm_dark,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    marginTop: 5,
  },
  tabBarItemStyle: {
    justifyContent: 'flex-end',
  },
  tabBarIconStyle: {
    marginTop: 5,
  }
});

export default TabNavigator;