import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/ThemeContext';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.searchBarWrapper}>
            <Icon name="search" size={24} color={theme.white} style={styles.searchIcon} />
            <TextInput
                style={styles.searchBar}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search..."
                placeholderTextColor={theme.white}
            />
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    searchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.transparent_dark,
        borderRadius: 32,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginBottom: 10
    },
    searchIcon: {
        marginHorizontal: 8,
    },
    searchBar: {
        flex: 1,
        color: theme.white,
        fontSize: 18,
        paddingHorizontal: 8,
        height: 40,
    }
});

export default SearchBar;