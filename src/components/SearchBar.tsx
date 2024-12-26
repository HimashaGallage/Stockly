import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';
import { SearchBarProps } from '../types/interfaces';

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
    const { colors, fontSizes, fonts } = useTheme();
    const styles = createStyles(colors, fonts, fontSizes);

    return (
        <View style={styles.searchBarWrapper}>
            <Icon name="search" size={24} color={colors.text_white} style={styles.searchIcon} />
            <TextInput
                style={styles.searchBar}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search..."
                placeholderTextColor={colors.text_white}
            />
        </View>
    );
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
    searchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gm_light,
        borderRadius: 32,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginBottom: 10,
        borderColor: colors.gm_dark,
        borderWidth: 1,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    searchIcon: {
        marginHorizontal: 8,
    },
    searchBar: {
        flex: 1,
        color: colors.text_white,
        fontSize: fontSizes.medium,
        paddingHorizontal: 16,
        height: 40,
        backgroundColor: colors.gm_light,
        borderRadius: 32,
    }
});

export default SearchBar;