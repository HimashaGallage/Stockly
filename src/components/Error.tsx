import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { View, Text, Button, StyleSheet } from 'react-native';
import {error_messsges } from '../utils/strings';
import { ErrorProps} from '../types/interfaces';

const Error: React.FC<ErrorProps> = ({ onRetry }) => {
    const { colors, fontSizes, fonts } = useTheme();
    const styles = createStyles(colors, fonts, fontSizes);
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>{error_messsges.general_error_messsage}</Text>
            <Button title="Retry" onPress={onRetry} />
        </View>
    );
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    errorText: {
        color: colors.warning_orange,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default Error;