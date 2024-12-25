import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomHeaderProps {
    title: string;
    onProfilePress: () => void;
    onNotificationPress: () => void;
}

const Header: React.FC<CustomHeaderProps> = ({ title, onProfilePress, onNotificationPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const profileImage = require('../../assets/img/profile.jpg');

    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={onProfilePress} style={styles.profileButton}>
                <Image
                    source={profileImage}
                    style={styles.profileImage}
                />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onNotificationPress} style={styles.notificationButton}>
                <Icon name="notifications-outline" size={35} style={styles.notificationIcon} />
            </Pressable>
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'transparent',
    },
    title: {
        color: theme.white,
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
    profileButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    notificationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    notificationIcon: {
        color: theme.white,
        fontWeight: 'bold'
    }
});

export default Header;