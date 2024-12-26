import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Button } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { formatTickerSymbol } from '../../utils/utils';
import StocklyFormField from '../../components/FormField';
import Spinner from '../../components/Spinner';
import { CustomModalProps } from '../../types/MarketDataTypes';

const CryptoDetailModal: React.FC<CustomModalProps> = ({ item, isVisible, onClose }) => {
  const { colors, fontSizes, fonts } = useTheme();
  const styles = createStyles(colors, fonts, fontSizes);

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
      transparent={true} // Keep this true for transparency
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView blurType="dark" blurAmount={10} reducedTransparencyFallbackColor={colors.text_white} style={styles.blurView} />
        <Pressable style={styles.backButton} onPress={onClose}>
          <Icon name="arrow-back" size={40} color={colors.icon_white} />
        </Pressable>
        <ScrollView contentContainerStyle={styles.form}>
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
            {/* Todo - Dummy purpose only. can move to seprate component */}
            <View style={styles.buttonContainer}>
              <Pressable style={styles.tradeBtn}>
                <Text style={styles.btnText}>Trade</Text>
              </Pressable>
              <Pressable style={styles.saveBtn}>
                <Text style={styles.btnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

      </View>
    </Modal>
  );
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
  container: {
    flex: 1
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 32,
    marginTop: 20,
    zIndex: 1,
  },
  form: {
    flexGrow: 1,
    alignItems: 'center',
  },
  formContainer: {
    width: '95%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: colors.gm_dark,
    borderColor: colors.gm_light,
    borderWidth: 1,
    marginTop: 10,
    zIndex: 1,
    alignSelf: 'center',
    shadowColor: colors.black,
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
    color: colors.green,
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  tradeBtn: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: colors.yellow
  },
  saveBtn: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: colors.green
  },
  btnText: {
    fontSize: fontSizes.medium,
    color: colors.bg_black
  }
});

export default CryptoDetailModal;