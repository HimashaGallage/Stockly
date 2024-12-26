import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type DynamicFormFieldProps = {
  label: string;
  value: string;
  editable?: boolean;
};

const StocklyFormField: React.FC<DynamicFormFieldProps> = ({ label, value, editable = false }) => {
  const { colors, fontSizes, fonts } = useTheme();
  const styles = createStyles(colors, fonts, fontSizes);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={editable}
      />
    </View>
  );
};

const createStyles = (colors: any, fonts: any, fontSizes: any) => StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,
    color: colors.text_white,
    marginBottom: 4,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderColor: colors.gm_light,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: colors.text_white,
    backgroundColor: colors.gm_light,
    textAlign: 'left',
    fontSize: 18,
  },
});

export default StocklyFormField;