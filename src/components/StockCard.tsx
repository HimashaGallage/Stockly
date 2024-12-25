import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { formatTickerSymbol } from '../utils/utils';
import { StockCardProps } from '../types/interfaces';

const StockCard: React.FC<StockCardProps> = React.memo(({ item, onPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <Pressable style={styles.cardContainer} onPress={onPress}>
            <View style={styles.tableRow}>
                {/* Left Section */}
                <View style={styles.leftCell}>
                    <Text style={styles.ticker}>
                        {formatTickerSymbol(item.ticker?.toUpperCase())}
                    </Text>
                    <Text style={styles.exchange}>{item.exchange}</Text>
                </View>
                {/* Right Section */}
                <View style={styles.rightCell}>
                    <Text style={styles.price}>
                        ${item.price?.toFixed(4)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
});


const createStyles = (theme: any) => StyleSheet.create({
    cardContainer: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: theme.transparent_light,
        borderWidth: 1,
        borderColor: theme.transparent_dark,
        shadowColor: theme.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: theme.shadow_grey,
    },
    leftCell: {
        flex: 1.5,
        textAlign: 'left',
        paddingLeft: 16,
    },
    rightCell: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 16,
        alignItems: 'flex-end',
    },
    ticker: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.green,
    },
    exchange: {
        fontSize: 16,
        color: theme.white,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.pink,
    }
});

export default StockCard;