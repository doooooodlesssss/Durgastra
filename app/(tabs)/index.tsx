// src/components/CycleStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCycles } from '../hooks/useCycles';

// Rest of the code...

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Text style={styles.text}>This is the home screen.</Text>
      <Link href="/about" style={styles.button}>
        Go to About
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C8B4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
    color: '#1E1E1E',
  },
  button: {
    fontSize: 18,
    color: '#1E1E1E',
    textDecorationLine: 'underline',
  },
});