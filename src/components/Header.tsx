import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { CustomHeaderProps } from '../types/interfaces';
import Icon from 'react-native-vector-icons/Ionicons';


const Header: React.FC<CustomHeaderProps> = ({ title, onProfilePress, onNotificationPress }) => {
    const { colors, fontSizes, fonts } = useTheme();
    const styles = createStyles(colors, fonts, fontSizes);
    const profileImage = require('../../assets/img/profile.jpg');

    return (
        <View style={styles.container}>
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

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bg_blue,
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    title: {
        color: colors.text_white,
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
    profileButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    notificationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 48,
    },
    notificationIcon: {
        color: colors.text_white,
        fontWeight: 'bold'
    }
});

export default Header;