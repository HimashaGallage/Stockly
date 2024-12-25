import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type DynamicFormFieldProps = {
  label: string;
  value: string;
  editable?: boolean;
};

const StocklyFormField: React.FC<DynamicFormFieldProps> = ({ label, value, editable = false }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

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

const createStyles = (theme: any) => StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,
    color: theme.white,
    marginBottom: 4,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderColor: theme.transparent_dark,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: theme.white,
    backgroundColor: theme.transparent_dark,
    textAlign: 'left',
    fontSize: 18,
  },
});

export default StocklyFormField;