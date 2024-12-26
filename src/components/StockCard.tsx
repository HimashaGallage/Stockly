import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { formatTickerSymbol } from '../utils/utils';
import { StockCardProps } from '../types/interfaces';

const StockCard: React.FC<StockCardProps> = React.memo(({ item, onPress }) => {
    const { colors, fontSizes, fonts } = useTheme();
    const styles = createStyles(colors, fonts, fontSizes);

    return (
        <Pressable style={styles.cardContainer} onPress={onPress}>
            <View style={styles.tableRow}>
                {/* Left Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/img/btclogo.png')} // Correct usage of require
                        style={styles.image} // Add styles as needed
                    />
                </View>
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


const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
    cardContainer: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: colors.gm_light,
        borderWidth: 1,
        borderColor: colors.gm_dark,
        shadowColor: colors.black,
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
        borderTopColor: colors.gm_light,
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
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        color: colors.green,
    },
    exchange: {
        fontSize: fontSizes.medium,
        color: colors.text_white,
    },
    price: {
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        color: colors.icon_pink,
    },
    logoContainer: {
        marginLeft: 10
    },
    image: {
        width: 25,
        height: 25
    }
});

export default StockCard;