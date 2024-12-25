import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { View, Text, Button, StyleSheet } from 'react-native';
import {error_messsges } from '../utils/strings';
import { ErrorProps} from '../types/interfaces';

const Error: React.FC<ErrorProps> = ({ onRetry }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{error_messsges.general_error_messsage}</Text>
            <Button title="Retry" onPress={onRetry} />
        </View>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: theme.base_black,
        borderRadius: 10,
        margin: 20,
    },
    errorText: {
        color: theme.warning_orange,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default Error;