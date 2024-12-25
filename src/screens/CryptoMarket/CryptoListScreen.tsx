import React, { useEffect, useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import TiingoWebSocket from '../../services/TiingoWebSocket';
import { StockItem } from '../../types/MarketDataTypes';
import { useTheme } from '../../theme/ThemeContext';
import CryptoDetailModal from './CryptoDetailModal';
import StockCard from '../../components/StockCard';
import SearchBar from '../../components/SearchBar';
import Spinner from '../../components/Spinner';

const CryptoListScreen: React.FC = () => {
    const [tickerData, setTickerData] = useState<StockItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

    const theme = useTheme();
    const backgroundImage = require('../../../assets/img/background.jpg');

    // Memoize styles
    const styles = useMemo(() => createStyles(theme), [theme]);

    useEffect(() => {
        const ws = TiingoWebSocket((data: StockItem) => {
            setTickerData((prevData) => {
                const existingIndex = prevData.findIndex((item) => item.ticker === data.ticker && item.exchange === data.exchange);
                if (existingIndex !== -1) {
                    // Update the existing item
                    const updatedData = [...prevData];
                    updatedData[existingIndex] = data;
                    return updatedData;
                } else {
                    // Add a new item
                    return [...prevData, data];
                }
            });
            setIsLoading(false);
        });

        return () => {
            ws.close();
        };
    }, []);

    const renderItem = ({ item }: { item: StockItem }) => (
        <StockCard item={item} onPress={() => handleNavigate(item)} />
    );

    const handleNavigate = (item: StockItem) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    // Filter tickerData based on searchQuery
    const filteredData = isLoading ? [] :
        searchQuery === '' ? tickerData :
            tickerData.filter(item =>
                item.ticker && item.ticker.toLowerCase().includes(searchQuery.toLowerCase())
            );

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.flatList}>
                    
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => `${item.ticker}-${item.exchange}`}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                {/* Render the modal if it is visible */}
                {modalVisible && selectedItem && (
                    <CryptoDetailModal
                        item={selectedItem}
                        isVisible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 24,
        paddingHorizontal: 16,
        marginBottom: 50,
    }
});

export default CryptoListScreen;