import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Ready to cook?</Text>
      <Text style={styles.title}>My Recipes</Text>
      <Text style={styles.subtitle}>Paste a recipe link to get started</Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 32,
    backgroundColor: '#5C7A4E',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});