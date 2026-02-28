import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Ready to cook?</Text>
      <Text style={styles.title}>My Recipes</Text>
      <Text style={styles.subtitle}>Paste a recipe link to get started</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  eyebrow: {
    fontSize: 13,
    color: '#5C7A4E',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8C8C7A',
    textAlign: 'center',
    lineHeight: 24,
  },
});