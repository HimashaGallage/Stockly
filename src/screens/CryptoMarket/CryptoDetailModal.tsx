import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Modal } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { StockItem } from '../../types/MarketDataTypes';
import { formatTickerSymbol } from '../../utils/utils';
import StocklyFormField from '../../components/StocklyFormField';
import Spinner from '../../components/Spinner';

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  item: StockItem;
};

const CryptoDetailModal: React.FC<CustomModalProps> = ({ item, isVisible, onClose }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const backgroundImage = require('../../../assets/img/background.jpg');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(isVisible);

  useEffect(() => {
    setIsLoading(false);
  }, [item]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <ImageBackground source={backgroundImage} style={styles.container}>
        <View style={styles.container}>
          <BlurView blurType="light" blurAmount={10} reducedTransparencyFallbackColor={theme.white} style={styles.blurView} />
          <Pressable style={styles.backButton} onPress={onClose}>
            <Icon name="arrow-back" size={34} color={theme.white} />
          </Pressable>
          <View style={styles.formContainer}>
            {item && (
              <>
                <Text style={styles.title}>{formatTickerSymbol(item.ticker?.toUpperCase())}</Text>
                <StocklyFormField label="Time" value={new Date(item.timestamp).toLocaleString()} />
                <StocklyFormField label="Exchange" value={item.exchange} />
                <StocklyFormField label="Price" value={`$${item.price.toFixed(4)}`} />
                {item.volum && <StocklyFormField label="Volume" value={item.volum.toFixed(8).toString()} />}
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    backButton: {
      alignSelf: 'flex-start',
      padding: 32,
      marginTop: 20,
      zIndex: 1,
    },
    formContainer: {
      width: '95%',
      padding: 20,
      borderRadius: 15,
      backgroundColor: theme.transparent_light,
      borderColor: theme.transparent_dark,
      borderWidth: 1,
      marginTop: 20,
      zIndex: 1,
      alignSelf: 'center',
      shadowColor: theme.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.green,
      marginBottom: 20,
    },
    blurView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
    },
  });

export default CryptoDetailModal;